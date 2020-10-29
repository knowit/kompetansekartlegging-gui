import { ReactComponent as K5 } from "../icons/K - ekspert.svg"
import { ReactComponent as K4 } from "../icons/K - superstjerne.svg"
import { ReactComponent as K3 } from "../icons/K - profesjonelt nivå.svg"
import { ReactComponent as K2 } from "../icons/K - potensielt brukbar.svg"
import { ReactComponent as K1 } from "../icons/K - noe innsikt.svg"
import { ReactComponent as K0 } from "../icons/K - ingen.svg"
import { ReactComponent as M5 } from "../icons/M - perfekt.svg"
import { ReactComponent as M4 } from "../icons/M - godt.svg"
import { ReactComponent as M3 } from "../icons/M - ok.svg"
import { ReactComponent as M2 } from "../icons/M - nja.svg"
import { ReactComponent as M1 } from "../icons/M - egentlig ikke.svg"
import { ReactComponent as M0 } from "../icons/M - Nei.svg"
import React from "react"

export {K0, K1, K2, K3, K4, K5, M0, M1, M2, M3, M4, M5}

export const GetIcons = (knowledge: boolean, className?: string): JSX.Element[] => {
    if(knowledge) {
        return [
            <K0 key={0} className={className} />,
            <K1 key={1} className={className} />,
            <K2 key={2} className={className} />,
            <K3 key={3} className={className} />,
            <K4 key={4} className={className} />,
            <K5 key={5} className={className} />
        ];
    }
    return [
        <M0 key={0} className={className} />,
        <M1 key={1} className={className} />,
        <M2 key={2} className={className} />,
        <M3 key={3} className={className} />,
        <M4 key={4} className={className} />,
        <M5 key={5} className={className} />
    ];
};
