**Proposal:** Payment Verification Report

**Objective:**
To address concerns about the accuracy of system-generated payments, this report aims to transparently compare the payments distributed by the system with independently calculated expected payments over the past school year. This will help identify any discrepancies and reinforce confidence in the system's integrity.

**Scope:**
Timeframe: Past 10 months (Typically, we will run as YTD to validate each payment run throughout the school year)

Data Sources:
* Actual payments distributed by the system
* Reference data used to calculate expected payments (e.g., contracts, rates, rules)

Method:
* Independently recalculate expected payments using agreed-upon logic or business rules
* Aggregate both actual and expected payments at multiple levels (e.g., by legal owner, site, class, payment category)
* Highlight variances between the two sets of numbers

Deliverables:
* PDF/interactive report summarizing findings
* Spreadsheet with raw comparison data
* Optional walkthrough to explain methodology and findings

Benefits:
1. Provides transparency and a structured view into the payment process.
2. Identifies potential systemic issues or data anomalies.
3. Strengthens trust and ensures alignment between system behavior and business expectations.

Next Steps:
Once approved, we can define the business rules for expected payments and gather the necessary data. A draft report can be delivered within 5 business days after data collection is complete.

Data Requirements:
Class ID | Teacher Name | Begin Date | End Date | Instruction Days | Teacher Type | Level of Certification | Salary Step | Frozen Salary Floor | Provider Type | County Type | Students Enrolled | 2025-08-01 | 2025-08-02 | 2025-08-03 | ...

* All dates should be in YYY-MM-DD format
* Class ID: string (5-6 digits)
* Teacher Name: string
* Begin Date: string
* End Date: string
* Instruction Days: integer
* Teacher Type: string (Lead Teacher, Assistant Teacher)
* Level of Certification: string
* Salary Step: string
* Frozen Salary Floor: float
* Provider Type: string (Public, Private)
* County Type: string (Non-Metro, Metro)
* Students Enrolled: integer
* Calendar Days: string (should include every non-weekend/holiday/break from the Calendar_Day_c object)
