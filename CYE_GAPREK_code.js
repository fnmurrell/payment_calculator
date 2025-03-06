// calendar days 
const INSTRUCTION_DAYS = 180;
const PLANNING_DAYS = 10;

const YEAR_SALARY_IS_MAXED_OUT = 21;
const SALARY_LOOKUP_TABLE = {
    'insufficient': {
        0: 25741.35,
        1: 25741.35,
        2: 25741.35,
        3: 25741.35,
        4: 25741.35,
        5: 25741.35,
        6: 25741.35,
        7: 25741.35,
        8: 25741.35,
        9: 25741.35,
        10: 25741.35,
        11: 25741.35,
        12: 25741.35,
        13: 25741.35,
        14: 25741.35,
        15: 25741.35,
        16: 25741.35,
        17: 25741.35,
        18: 25741.35,
        19: 25741.35,
        20: 25741.35,
        21: 25741.35
    },
    'A-T1': {
        0: 30949.86,
        1: 30949.86,
        2: 31803.36,
        3: 31803.36,
        4: 32682.46,
        5: 32682.46,
        6: 33587.93,
        7: 33587.93,
        8: 34520.57,
        9: 34520.57,
        10: 35481.19,
        11: 35481.19,
        12: 36470.63, 
        13: 36470.63,
        14: 37489.75,
        15: 37489.75,
        16: 38539.44,
        17: 38539.44,
        18: 39620.62,
        19: 39620.62,
        20: 40734.24,
        21: 40734.24
    },
    'T1': {
        0: 36815.60,
        1: 36815.60,
        2: 37845.07,
        3: 37845.07,
        4: 38905.42,
        5: 38905.42,
        6: 39997.58,
        7: 39997.58,
        8: 41122.51,
        9: 41122.51,
        10: 42281.19,
        11: 42281.19,
        12: 43474.63,
        13: 43474.63,
        14: 44703.87,
        15: 44703.87,
        16: 45969.99,
        17: 45969.99,
        18: 47274.09,
        19: 47274.09,
        20: 48617.31,
        21: 48617.31
    },
    'T4': {
        0: 45320.73,
        1: 45320.73,
        2: 46605.35,
        3: 46605.35,
        4: 47928.51,
        5: 47928.51,
        6: 49291.37,
        7: 49291.37,
        8: 50695.11,
        9: 50695.11,
        10: 52140.96,
        11: 52140.96,
        12: 53630.19,
        13: 53630.19,
        14: 55164.1,
        15: 55164.1,
        16: 56744.02,
        17: 56744.02,
        18: 58371.34,
        19: 58371.34,
        20: 60047.48,
        21: 60047.48        
    },
    'T5': {
        0: 49843.04,
        1: 49843.04,
        2: 51263.33,
        3: 51263.33,
        4: 52726.23,
        5: 52726.23,
        6: 54233.02,
        7: 54233.02,
        8: 55785.01,
        9: 55785.01,
        10: 57383.56,
        11: 57383.56,
        12: 59030.07,
        13: 59030.07,
        14: 60725.97,
        15: 60725.97,
        16: 62472.75,
        17: 62472.75,
        18: 64271.93,
        19: 64271.93,
        20: 66125.09,
        21: 66125.09        
    },
    'T6': {
        0: 49843.04,
        1: 49843.04,
        2: 51263.33,
        3: 51263.33,
        4: 52726.23,
        5: 52726.23,
        6: 54233.02,
        7: 54233.02,
        8: 55785.01,
        9: 55785.01,
        10: 57383.56,
        11: 57383.56,
        12: 59030.07,
        13: 59030.07,
        14: 60725.97,
        15: 60725.97,
        16: 62472.75,
        17: 62472.75,
        18: 64271.93,
        19: 64271.93,
        20: 66125.09,
        21: 66125.09       
    },
    'T7': {
        0: 49843.04,
        1: 49843.04,
        2: 51263.33,
        3: 51263.33,
        4: 52726.23,
        5: 52726.23,
        6: 54233.02,
        7: 54233.02,
        8: 55785.01,
        9: 55785.01,
        10: 57383.56,
        11: 57383.56,
        12: 59030.07,
        13: 59030.07,
        14: 60725.97,
        15: 60725.97,
        16: 62472.75,
        17: 62472.75,
        18: 64271.93,
        19: 64271.93,
        20: 66125.09,
        21: 66125.09       
    },
};

function estimate(){
    const form = document.querySelector('form');
    const data = new FormData(form);
    const leadAmount = 
        findLTSalary(
            data.get('teacherCredential'),
            parseInt(data.get('teacherCYE')),
            parseInt(data.get('instructDays')),
            parseInt(data.get('planningDays'))
        );
    const leadBenefits = 
        findLTBenefits(
            data.get('teacherCredential'),
            parseInt(data.get('teacherCYE')),
            parseInt(data.get('instructDays')),
            parseInt(data.get('planningDays')),
            data.get('providerType')
        );
    document.getElementById('LT_salary').innerHTML = leadAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('LT_benefits').innerHTML = leadBenefits.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    const totalEstimate = leadAmount + leadBenefits;
    document.getElementById('totalEstimate').innerHTML = totalEstimate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}

function findLTSalary(teacherLevel, yearsOfExperience, instructionDays, planningDays) {
    if(yearsOfExperience > YEAR_SALARY_IS_MAXED_OUT) {
        yearsOfExperience = YEAR_SALARY_IS_MAXED_OUT;
    }
    const dailyRate = SALARY_LOOKUP_TABLE[teacherLevel][yearsOfExperience] / (INSTRUCTION_DAYS + PLANNING_DAYS);
    LT_salary = dailyRate * (instructionDays + planningDays);
    return LT_salary;
}

function findLTBenefits(teacherLevel, yearsOfExperience, instructionDays, planningDays, providerType) {
    if(yearsOfExperience > YEAR_SALARY_IS_MAXED_OUT) {
        yearsOfExperience = YEAR_SALARY_IS_MAXED_OUT;
    }
    if(providerType === 'providerPrivate') {
        yearlySalary = (SALARY_LOOKUP_TABLE[teacherLevel][yearsOfExperience] * .2376) / (INSTRUCTION_DAYS + PLANNING_DAYS);
    } else if(providerType === 'providerPublic' && teacherLevel === 'BT-4'|| teacherLevel === 'T4' || teacherLevel === 'BT-5' || teacherLevel === 'T5' || teacherLevel === 'BT-6' || teacherLevel === 'T6' || teacherLevel === 'BT-7' || teacherLevel === 'T7') {
        yearlySalary = (SALARY_LOOKUP_TABLE[teacherLevel][yearsOfExperience] * .2223) / (INSTRUCTION_DAYS + PLANNING_DAYS);
    }
    LT_benefits = yearlySalary * (instructionDays + planningDays);
    return LT_benefits;
}