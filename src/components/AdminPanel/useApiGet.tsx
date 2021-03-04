import { useEffect, useState } from "react";
import { compareByName } from "./helpers";

const useApiGet = ({
    getFn,
    constantResult,
    refreshCounter,
    cmpFn = compareByName,
}: any) => {
    const [result, setResult] = useState<any[]>(constantResult || []);
    const [loading, setLoading] = useState<boolean>(!constantResult);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        if (!constantResult) {
            const f = async () => {
                if (refreshCounter === 0) {
                    setLoading(true);
                }
                const res = await getFn();
                if (res.result) {
                    if (cmpFn) {
                        setResult(res.result.sort(cmpFn));
                    } else {
                        setResult(res.result);
                    }
                } else {
                    setError(res.error);
                }
                if (refreshCounter === 0) {
                    setLoading(false);
                }
            };
            f();
        }
    }, [refreshCounter, getFn, cmpFn, constantResult]);

    return { result, error, loading };
};

export default useApiGet;
