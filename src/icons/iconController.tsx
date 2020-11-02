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
import clsx from 'clsx';
import React, { Fragment } from "react";
import { makeStyles, Tooltip } from "@material-ui/core"

const IconStyle = makeStyles({
    iconBase: {
        // '&:hover': {
            
        // }
    }
});

const getIconDescription = (knowledge: boolean, level: number): string => {
    switch(level) {
        case 0: return "";
        default: return "";
    }
};

const CreateHover = (knowledge: boolean, level: number, className?: string, key?: number): JSX.Element => {
    switch(level){
        case 0: return <Tooltip title={getIconDescription(knowledge, level)} ><K0 key={key || null} className={clsx(className)} /></Tooltip>;
        default: return <Fragment />;
    }
    
    // <Tooltip title="Test" >
    //     <K0></K0>
    // </Tooltip>
};

export {K0, K1, K2, K3, K4, K5, M0, M1, M2, M3, M4, M5}

export const GetIcons = (knowledge: boolean, className?: string): JSX.Element[] => {
    const style = IconStyle();
    if(knowledge) {
        return [
            <K0 key={0} className={clsx(style.iconBase, className)} />,
            <K1 key={1} className={clsx(style.iconBase, className)} />,
            <K2 key={2} className={clsx(style.iconBase, className)} />,
            <K3 key={3} className={clsx(style.iconBase, className)} />,
            <K4 key={4} className={clsx(style.iconBase, className)} />,
            <K5 key={5} className={clsx(style.iconBase, className)} />
        ];
    }
    return [
        <M0 key={0} className={clsx(style.iconBase, className)} />,
        <M1 key={1} className={clsx(style.iconBase, className)} />,
        <M2 key={2} className={clsx(style.iconBase, className)} />,
        <M3 key={3} className={clsx(style.iconBase, className)} />,
        <M4 key={4} className={clsx(style.iconBase, className)} />,
        <M5 key={5} className={clsx(style.iconBase, className)} />
    ];
};

export const GetIcon = (knowledge: boolean, level: number, className?: string): JSX.Element => {
    const style = IconStyle();
    if(knowledge) {
        switch (level) {
            case 0: return <K0 className={clsx(style.iconBase, className)} />
            case 1: return <K1 className={clsx(style.iconBase, className)} />
            case 2: return <K2 className={clsx(style.iconBase, className)} />
            case 3: return <K3 className={clsx(style.iconBase, className)} />
            case 4: return <K4 className={clsx(style.iconBase, className)} />
            case 5: return <K5 className={clsx(style.iconBase, className)} />
            default: return <Fragment />
        };
    } else {
        switch (level) {
            case 0: return <M0 className={clsx(style.iconBase, className)} />
            case 1: return <M1 className={clsx(style.iconBase, className)} />
            case 2: return <M2 className={clsx(style.iconBase, className)} />
            case 3: return <M3 className={clsx(style.iconBase, className)} />
            case 4: return <M4 className={clsx(style.iconBase, className)} />
            case 5: return <M5 className={clsx(style.iconBase, className)} />
            default: return <Fragment />
        };
    }
};
