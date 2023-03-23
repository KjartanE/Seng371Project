//random number generator
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

const less = [
    'Prioritize your expenses; rent, food, and utilities are the most important',
    'Cut unneeded expenses such as eating out or unused subscription services',
    'Repay any debt as soon as possible',
    'Use cash instead of credit to avoid high-interest debt',
    'Build an emergency fund to help with unforseeen expenses',
    'Find ways to earn extra money'
]

const between = [
    'set financial or savings goals, such as saving for a large purchase or building an emergency fund',
    'Define expense catagories and allocate a portion of your income to each catagory, include both essential and nonessential expenses',
    'Track your spending and identify areas to cut back',
    'Pay off any debt',
    'Save money in a high interest savings account such as a TFSA and create a ling term savings goal'
]

const over = [
    'Review expenses and identify areas to cut back in',
    'Increase savings by aiming to save 20% of your income per month',
    'Invest your money in things such as stocks or mutual funds; talk with a financial advisor to find the best investment oportunities',
    'Revisit budget monthly to make any adjestments needed',
    'Set aside money in a TFSA or another high interest savings account'
]

export default function getTips(amount: number): string{
    if(amount < 1000){
        const idx = getRandomInt(6);
        return less[idx];
    }else if (amount >= 1000 && amount < 5000){
        const idx = getRandomInt(5);
        return between[idx];
    }else if (amount >= 5000){
        const idx = getRandomInt(5);
        return over[idx];
    }
    return 'invalid budget';
}