// calendar days 
const INSTRUCTION_DAYS = 180;
const PLANNING_DAYS = 10;

// transportation 
const TRANSPORTATION = 80.78 / INSTRUCTION_DAYS;

// yearly operating cost variables
const OPERATING_PUBLIC = 18507.63 / INSTRUCTION_DAYS;
const OPERATING_METRO = 35292.44 / INSTRUCTION_DAYS;
const OPERATING_NON_METRO = 26913.63 / INSTRUCTION_DAYS;

// teacher salary variabeles
const AT_SALARY = 25741.35 / (INSTRUCTION_DAYS + PLANNING_DAYS);

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
        2: 30949.86,
        3: 31916.86,
        4: 32912.86,
        5: 33937.86,
        6: 34993.86,
        7: 36081.86,
        8: 37201.86,
        9: 38355.86,
        10: 38355.86,
        11: 39544.86,
        12: 39544.86,
        13: 40768.86,
        14: 40768.86,
        15: 42029.86,
        16: 42029.86,
        17: 43328.86,
        18: 43328.86,
        19: 44666.86,
        20: 44666.86,
        21: 46044.86
    },
    'T1': {
        0: 41717,
        1: 41717,
        2: 41717,
        3: 42684,
        4: 43680,
        5: 44705,
        6: 45761,
        7: 46849,
        8: 47969,
        9: 49123,
        10: 49123,
        11: 50312,
        12: 50312,
        13: 51536,
        14: 51536,
        15: 52797,
        16: 52797,
        17: 54096,
        18: 54096,
        19: 55434,
        20: 55434,
        21: 56812
    },
    'BT-4': {
        0: 41717,
        1: 41717,
        2: 41717,
        3: 41717,
        4: 41717,
        5: 41717,
        6: 41717,
        7: 41717,
        8: 41717,
        9: 41717,
        10: 41717,
        11: 41717,
        12: 41717,
        13: 41717,
        14: 41717,
        15: 41717,
        16: 41717,
        17: 41717,
        18: 41717,
        19: 41717,
        20: 41717,
        21: 41717        
    },
    'T4': {
        0: 43592,
        1: 43592,
        2: 43592,
        3: 44615,
        4: 45668,
        5: 46753,
        6: 48243,
        7: 49495,
        8: 51201,
        9: 52452,
        10: 52452,
        11: 53741,
        12: 53741,
        13: 55068,
        14: 55068,
        15: 56435,
        16: 56435,
        17: 57843,
        18: 57843,
        19: 59293,
        20: 59293,
        21: 60787        
    },
    'BT-5': {
        0: 45808,
        1: 45808,
        2: 45808,
        3: 46897,
        4: 48019,
        5: 49175,
        6: 50762,
        7: 52000,
        8: 53913,
        9: 55245,
        10: 55245,
        11: 56617,
        12: 56617,
        13: 58031,
        14: 58031,
        15: 59487,
        16: 59487,
        17: 60987,
        18: 60987,
        19: 62532,
        20: 62532,
        21: 64123        
    },
    'T5': {
        0: 48706,
        1: 48706,
        2: 48706,
        3: 49882,
        4: 51093,
        5: 52341,
        6: 54055,
        7: 55392,
        8: 57457,
        9: 58869,
        10: 58869,
        11: 60378,
        12: 60378,
        13: 61904,
        14: 61904,
        15: 63476,
        16: 63476,
        17: 65095,
        18: 65095,
        19: 66763,
        20: 66763,
        21: 68481        
    },
    'BT-6': {
        0: 51254,
        1: 51254,
        2: 51254,
        3: 52507,
        4: 53797,
        5: 55126,
        6: 56951,
        7: 58375,
        8: 60574,
        9: 62106,
        10: 62106,
        11: 63684,
        12: 63684,
        13: 65310,
        14: 65310,
        15: 66984,
        16: 66984,
        17: 68709,
        18: 68709,
        19: 70485,
        20: 70485,
        21: 72315        
    },
    'T6': {
        0: 53803,
        1: 53803,
        2: 53803,
        3: 55132,
        4: 56501,
        5: 57911,
        6: 59847,
        7: 61357,
        8: 63691,
        9: 65317,
        10: 65317,
        11: 66992,
        12: 66992,
        13: 68717,
        14: 68717,
        15: 70494,
        16: 70494,
        17: 72324,
        18: 72324,
        19: 74209,
        20: 74209,
        21: 76510        
    },
    'BT-7': {
        0: 56683,
        1: 56683,
        2: 56683,
        3: 58098,
        4: 59556,
        5: 61058,
        6: 63120,
        7: 64729,
        8: 67214,
        9: 68945,
        10: 68945,
        11: 70728,
        12: 70728,
        13: 72565,
        14: 72565,
        15: 74457,
        16: 74457,
        17: 76406,
        18: 76406,
        19: 78413,
        20: 78413,
        21: 80480        
    },
    'T7': {
        0: 58676,
        1: 58676,
        2: 58676,
        3: 60151,
        4: 61671,
        5: 63236,
        6: 65385,
        7: 67062,
        8: 69652,
        9: 71457,
        10: 71457,
        11: 73316,
        12: 73316,
        13: 75230,
        14: 75230,
        15: 77202,
        16: 77202,
        17: 79233,
        18: 79233,
        19: 81325,
        20: 81325,
        21: 83480        
    }
};

function estimate(){
    const form = document.querySelector('form');
    const data = new FormData(form);
    const operatingAmount =  
        findOperatingCost(
            data.get('providerType'),
            data.get('countyType'),
            parseInt(data.get('instructDays')),
            parseInt(data.get('studentsEnrolled'))
        );
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
    const assistantAmount = 
        findATSalary(
            parseInt(data.get('instructDays')),
            parseInt(data.get('planningDays'))
        );
    const assistantBenefits = 
        findATBenefits(
            AT_SALARY,
            parseInt(data.get('instructDays')),
            parseInt(data.get('planningDays'))
        );
    document.getElementById('operatingCost').innerHTML = operatingAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('LT_salary').innerHTML = leadAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('LT_benefits').innerHTML = leadBenefits.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('AT_salary').innerHTML = assistantAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('AT_benefits').innerHTML = assistantBenefits.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    const totalEstimate = operatingAmount + assistantAmount + leadAmount + leadBenefits + assistantBenefits;
    document.getElementById('totalEstimate').innerHTML = totalEstimate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}

function findOperatingCost(providerType, countyType, instructionDays, studentsEnrolled) {
    let dailyRate = 0;
    if(providerType === 'providerPublic') {
        dailyRate = OPERATING_PUBLIC / studentsEnrolled;
    } else if(countyType === 'countyMetro') {
        dailyRate = OPERATING_METRO / studentsEnrolled;
    } else {
        dailyRate = OPERATING_NON_METRO / studentsEnrolled;
    }
    operating = (dailyRate * instructionDays * studentsEnrolled) + (dailyTransportation = TRANSPORTATION * instructionDays * studentsEnrolled);
    return operating;
}

function findLTSalary(teacherLevel, yearsOfExperience, instructionDays, planningDays) {
    if(yearsOfExperience > YEAR_SALARY_IS_MAXED_OUT) {
        yearsOfExperience = YEAR_SALARY_IS_MAXED_OUT;
    }
    const dailyRate = SALARY_LOOKUP_TABLE[teacherLevel][yearsOfExperience] / (INSTRUCTION_DAYS + PLANNING_DAYS);
    LT_salary = dailyRate * (instructionDays + planningDays);
    return LT_salary;
}

function findATSalary(instructionDays, planningDays) {
    let dailyRate = AT_SALARY;
    AT_salary = dailyRate * (instructionDays + planningDays);
    return AT_salary;
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

// certified lead teachers for public providers receive 20.78 percent benefits and 1.45 percent for category 2 

function findATBenefits(annualSalary,instructionDays,planningDays) {
    AT_benefits = (annualSalary * .2376) * (instructionDays + planningDays);
    return AT_benefits;
}