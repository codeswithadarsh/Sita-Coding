const validateGroups = (groups) => {
    const errors = [];
    const numbersMap = new Map();
    let isOverlap = false;


    for (const group of groups) {
        if (group.from < 1 || group.to > 10) {
            errors.push('Groups should be within the range of 1-10');
        }
    }

    for (const group of groups) {
        for (let i = group.from; i <= group.to; i++) {
            if (numbersMap.has(i)) {
                isOverlap = true;
            } else {
                numbersMap.set(i, group);
            }
        }
    }

    if(isOverlap){
        errors.push(`Overlap detected`);
    }

 
    const sortedGroups = groups.sort((a, b) => a.from - b.from);
    for(let i = 0; i < sortedGroups.length - 1; i++) {
        if(sortedGroups[i].to + 1 !== sortedGroups[i+1].from) {
            errors.push(`Gap detected between group ${i+1} and group ${i+2}`);
        }
    }

    return errors;
};

export default validateGroups;