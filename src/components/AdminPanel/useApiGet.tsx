import { useEffect, useState } from "react";
import { compareByName } from "./helpers";

const useApiGet = ({ getFn, refreshCounter, cmpFn = compareByName }: any) => {
    const [result, setResult] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const f = async () => {
            setLoading(true);
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
            setLoading(false);
        };
        f();
    }, [refreshCounter, getFn, cmpFn]);

    return { result, error, loading };
};

export default useApiGet;
