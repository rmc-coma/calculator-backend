function validateCalculateInput(terms: Array<number | string> | undefined) {
    if (
        !terms ||
        !Array.isArray(terms) ||
        !(terms.length > 0) ||
        typeof terms[0] !== "number" ||
        typeof terms[terms.length - 1] !== "number"
    ) {
        return false;
    }
    let previousTerm: (typeof terms)[number] | undefined = undefined;
    for (const term of terms) {
        if (
            (!previousTerm && typeof term === "number") ||
            (typeof previousTerm === "string" &&
                typeof term === "number" &&
                !(previousTerm === "/" && term === 0)) ||
            (typeof previousTerm === "number" &&
                typeof term === "string" &&
                ["+", "-", "*", "/"].includes(term))
        ) {
            previousTerm = term;
            continue;
        } else {
            return false;
        }
    }
    return true;
}

export default { validateCalculateInput };
