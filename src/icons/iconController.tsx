import { ReactComponent as K5 } from "../icons/K - matrixjordber.svg"
import { ReactComponent as K4 } from "../icons/K - jordber.svg"
import { ReactComponent as K3 } from "../icons/K - blomst.svg"
import { ReactComponent as K2 } from "../icons/K - knopp.svg"
import { ReactComponent as K1 } from "../icons/K - spire.svg"
import { ReactComponent as K0 } from "../icons/K - fro.svg"

import { ReactComponent as M5 } from "../icons/M - perfekt.svg"
import { ReactComponent as M4 } from "../icons/M - godt.svg"
import { ReactComponent as M3 } from "../icons/M - onsker erfaring.svg"
import { ReactComponent as M2 } from "../icons/M - vedbehov.svg"
import { ReactComponent as M1 } from "../icons/M - nja.svg"
import { ReactComponent as M0 } from "../icons/M - nei.svg"

import React, { Fragment, useState } from "react";
import { makeStyles, Tooltip } from "@material-ui/core"
import { KnowitColors } from "../styles"

const getIconDescription = (knowledge: boolean, level: number): string => {
    if(knowledge){
        switch(level) {
            case 0: return "Kjenner ikke til området";
            case 1: return "Noe innsikt";
            case 2: return "Potensielt brukbar kompetanse";
            case 3: return "Profesjonelt nivå";
            case 4: return "Ekspert";
            case 5: return "Superstjerne";
            default: return "";
        }
    }
    switch(level) {
        case 0: return "Nei. Dette vil jeg ikke jobbe med.";
        case 1: return "Nøytral. Ingen formening.";
        case 2: return "Tja. Kan hvis det er behov.";
        case 3: return "Nysgjerring. Dette vil jeg lære mer om.";
        case 4: return "Godt. Dette er det jeg ønsker å jobbe med.";
        case 5: return "Ildsjel. Jeg brenner for dette.";
        default: return "";
    }
};

const CreateHover = (knowledge: boolean, level: number, className?: string, key?: number): JSX.Element => {

    let element: JSX.Element = <Fragment />;
    if(knowledge){
        switch(level){
            case 0: element = <K0 className={className} />; break;
            case 1: element = <K1 className={className} />; break;
            case 2: element = <K2 className={className} />; break;
            case 3: element = <K3 className={className} />; break;
            case 4: element = <K4 className={className} />; break;
            case 5: element = <K5 className={className} />; break;
        }
    } else {
        switch(level){
            case 0: element = <M0 className={className} />; break;
            case 1: element = <M1 className={className} />; break;
            case 2: element = <M2 className={className} />; break;
            case 3: element = <M3 className={className} />; break;
            case 4: element = <M4 className={className} />; break;
            case 5: element = <M5 className={className} />; break;
        }
    }

    return <Tooltip key={key ? key : null} title={getIconDescription(knowledge, level)}>{element}</Tooltip>;
};

const CreateClickable = (knowledge: boolean, level: number, className?: string, key?: number): JSX.Element => {

    let element: JSX.Element = <Fragment />;
    if(knowledge){
        switch(level){
            case 0: element = <K0 className={className} />; break;
            case 1: element = <K1 className={className} />; break;
            case 2: element = <K2 className={className} />; break;
            case 3: element = <K3 className={className} />; break;
            case 4: element = <K4 className={className} />; break;
            case 5: element = <K5 className={className} />; break;
        }
    } else {
        switch(level){
            case 0: element = <M0 className={className} />; break;
            case 1: element = <M1 className={className} />; break;
            case 2: element = <M2 className={className} />; break;
            case 3: element = <M3 className={className} />; break;
            case 4: element = <M4 className={className} />; break;
            case 5: element = <M5 className={className} />; break;
        }
    }

    return <ClickableTooltip key={`${getIconDescription(knowledge, level)}-${key}`} knowledge={knowledge} level={level} element={element} />;
};

const useStyles = makeStyles(theme => ({
    tooltip: {
        backgroundColor: KnowitColors.white,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        opacity: 0.9,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        color: KnowitColors.darkBrown,
        borderColor: KnowitColors.darkBrown
    },
}));

const ClickableTooltip = (props: {knowledge: boolean, level: number, element: JSX.Element}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleClick = () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 2000);
    }

    const classes = useStyles();

    const desc = getIconDescription(props.knowledge, props.level);

    return <Tooltip classes={classes} onClick={handleClick} placement={"top"} open={isOpen} disableTouchListener={false} title={desc}>{props.element}</Tooltip>;
}

export {K0, K1, K2, K3, K4, K5, M0, M1, M2, M3, M4, M5}

export const GetIcons = (knowledge: boolean, className?: string): JSX.Element[] => {
    let els = [
        CreateHover(knowledge, 0, className, 0),
        CreateHover(knowledge, 1, className, 1),
        CreateHover(knowledge, 2, className, 2),
        CreateHover(knowledge, 3, className, 3),
        CreateHover(knowledge, 4, className, 4),
        CreateHover(knowledge, 5, className, 5)
    ];
    return els;
};

export const GetClickableIcons = (knowledge: boolean, className?: string): JSX.Element[] => {
    let els = [
        GetClickableIcon(knowledge, 0, className, 0),
        GetClickableIcon(knowledge, 1, className, 1),
        GetClickableIcon(knowledge, 2, className, 2),
        GetClickableIcon(knowledge, 3, className, 3),
        GetClickableIcon(knowledge, 4, className, 4),
        GetClickableIcon(knowledge, 5, className, 5)
    ];
    return els;
};

export const GetIcon = (knowledge: boolean, level: number, className?: string, key?: number): JSX.Element => {
    return CreateHover(knowledge, level, className);
};

export const GetClickableIcon = (knowledge: boolean, level: number, className?: string, key?: number): JSX.Element => {
    return CreateClickable(knowledge, level, className);
};
