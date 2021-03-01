const getAttribute = (user: any, attribute: string): string | undefined =>
    user?.Attributes?.find((attr: any) => attr.Name === attribute)?.Value;

const not = (a: any, b: any) =>
    a.filter((av: any) => !b.some((bv: any) => bv.Username === av.Username));

const compareByName = (a: any, b: any) => {
    const aName = getAttribute(a, "name");
    const bName = getAttribute(b, "name");
    if (!aName) return 1;
    if (!bName) return -1;
    return aName.localeCompare(bName);
};

export { getAttribute, not, compareByName };
