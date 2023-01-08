const operators = ["+", "-", "*", "/"];

function subgroupTermsByPriority(
    terms: Array<number | string>
): Array<Array<number | string> | string> {
    const subgroups = new Array<Array<number | string> | string>();
    let i = 0;
    while (i < terms.length) {
        let j = i + 1;
        while (
            j < terms.length &&
            !(typeof terms[j] === "string" && (terms[j] === "+" || terms[j] === "-"))
        ) {
            ++j;
        }
        subgroups.push(terms.slice(i, j));
        if (typeof terms[j] === "string") {
            subgroups.push(terms[j]! as string);
        }
        i = j + 1;
    }
    return subgroups;
}

function nonPrioritizedSummerizing(terms: Array<number | string>): number | never {
    let sum = terms[0]! as number;
    let i = 1;
    while (i < terms.length) {
        const term = terms[i]!;
        if (typeof term === "string" && operators.includes(term)) {
            switch (term as "+" | "-" | "*" | "/") {
                case "+": {
                    sum += (terms as number[])[i + 1]!;
                    break;
                }
                case "-": {
                    sum -= (terms as number[])[i + 1]!;
                    break;
                }
                case "/": {
                    sum /= (terms as number[])[i + 1]!;
                    break;
                }
                case "*": {
                    sum *= (terms as number[])[i + 1]!;
                }
            }
            i += 2;
        } else {
            throw new Error("Invalid input");
        }
    }
    return sum;
}

function calculate(terms: Array<number | string>): number | never {
    return nonPrioritizedSummerizing(
        subgroupTermsByPriority(terms).map(subgroup =>
            typeof subgroup === "string" ? subgroup : nonPrioritizedSummerizing(subgroup)
        )
    );
}

export default { calculate };
