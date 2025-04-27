import pandas as pd
from datetime import datetime
from salary_table import SALARY_LOOKUP_TABLE

# Constants
PLANNING_DAYS = 10
TRANSPORTATION = 80.78 / 180
OPERATING_RATES = {
    "providerPublic": 18507.63 / 180,
    "metro": 35292.44 / 180,
    "non_metro": 26913.63 / 180,
}
ANNUAL_AT_SALARY = 25741.35
YEAR_SALARY_IS_MAXED_OUT = 21

# Helper Functions
def calculate_days_worked(begin_date, end_date, day_columns):
    today = datetime.today()
    
    # Convert Begin Date to datetime object
    start_date = datetime.strptime(begin_date, "%Y-%m-%d")
    
    # If end_date exists, convert it to datetime, otherwise use today
    if pd.notna(end_date):
        end_date = datetime.strptime(end_date, "%Y-%m-%d")
    else:
        end_date = today
    
    # Initialize counters
    instructional_days = 0
    planning_days = 0
    
    # Iterate over each day in the 'day_columns' DataFrame
    for date_str, day_type in day_columns.items():
        # Convert the date string to a datetime object
        day_date = datetime.strptime(date_str, "%Y-%m-%d")
        
        # Check if the day falls within the date range
        if start_date <= day_date <= end_date:
            # Count the day as instructional or planning depending on its type
            if day_type == "Planning Day":
                planning_days += 1
            elif pd.isna(day_type):  # If the day type is null, count as instructional day
                instructional_days += 1
    
    return instructional_days, planning_days

def find_lt_salary(level, experience, instruct_days, planning_days, frozen_floor=None):
    exp = min(experience, YEAR_SALARY_IS_MAXED_OUT)
    table_salary = SALARY_LOOKUP_TABLE[level][exp]
    
    if pd.notna(frozen_floor):  # If frozen floor is given, use the max
        annual_salary = max(table_salary, frozen_floor)
    else:
        annual_salary = table_salary

    daily_rate = annual_salary / (instruct_days + PLANNING_DAYS)
    return daily_rate * (instruct_days + planning_days), annual_salary

def find_at_salary(annual_salary, instruct_days, planning_days):
    total_days = instruct_days + planning_days
    daily_rate = annual_salary / total_days
    return daily_rate * total_days

def find_lt_benefits(annual_salary, instruct_days, planning_days, provider, level):
    total_days = instruct_days + planning_days

    if provider == 'providerPrivate':
        rate = 0.2376
    elif provider == 'providerPublic' and level.startswith(('BT-', 'T')):
        rate = 0.2223
    else:
        rate = 0

    return (annual_salary * rate / total_days) * total_days

def find_at_benefits(total_salary):
    return total_salary * 0.2376

def find_operating_cost(provider_type, county_type, instruct_days, students):
    if provider_type == 'providerPublic':
        daily = OPERATING_RATES['providerPublic']
    elif county_type == 'countyMetro':
        daily = OPERATING_RATES['metro']
    else:
        daily = OPERATING_RATES['non_metro']
    
    base_op = daily * instruct_days * students
    transport = TRANSPORTATION * instruct_days * students
    return base_op + transport

# Load CSV
df = pd.read_csv("prek_payment_data.csv")

# Results list
records = []

# Loop through each teacher
for _, row in df.iterrows():
    instruct_days = row["Instruction Days"]
    planning_days = PLANNING_DAYS
    students = row["Students Enrolled"]
    
    begin_date = row['Begin Date']
    end_date = row['End Date'] if pd.notna(row['End Date']) else None
    
    # Extract day columns from the CSV and assume they are the columns after 'Begin Date' and 'End Date'
    day_columns = row.iloc[3:]  # Exclude Teacher Name, Begin Date, End Date columns
    instructional_days, planning_days = calculate_days_worked(begin_date, end_date, day_columns)
    
    # Total days worked (instruction + planning)
    days_worked = instructional_days + planning_days
    
    # Cap instruction/planning days to days worked
    instr_worked = min(instruct_days, days_worked)
    plan_worked = min(planning_days, max(0, days_worked - instr_worked))

    lt_salary = lt_benefits = at_salary = at_benefits = 0

    if row["Role"] == "Lead Teacher":
        lt_salary, annual_used = find_lt_salary(
            row["Credential"],
            int(row["Experience"]),
            instr_worked,
            plan_worked,
            row.get("Frozen Salary Floor")
        )
        lt_benefits = find_lt_benefits(
            annual_used,
            instr_worked,
            plan_worked,
            row["Provider Type"],
            row["Credential"]
        )
    elif row["Role"] == "Assistant Teacher":
        at_salary = find_at_salary(ANNUAL_AT_SALARY, instr_worked, plan_worked)
        at_benefits = find_at_benefits(at_salary)

    # Operating cost per classroom — only add once per classroom
    operating_cost = find_operating_cost(
        row["Provider Type"],
        row["County Type"],
        instr_worked,
        students
    )

    records.append({
        "Classroom ID": row["Class ID"],  # Adding Class ID to group by
        "LT_Salary": lt_salary,
        "LT_Benefits": lt_benefits,
        "AT_Salary": at_salary,
        "AT_Benefits": at_benefits,
        "Operating_Cost": operating_cost
    })

# Turn into DataFrame
summary_df = pd.DataFrame(records)

# Group and sum by classroom
grouped = summary_df.groupby("Classroom ID").sum(numeric_only=True)
grouped["Total_Cost"] = grouped.sum(axis=1)

# Save to CSV
grouped.to_csv("prek_payment_audit.csv")