import React from 'react'
import { DescTableStyle } from '../styles';
import { ReactComponent as IconK5 } from "../icons/K - ekspert.svg"
import { ReactComponent as IconK4 } from "../icons/K - superstjerne.svg"
import { ReactComponent as IconK3 } from "../icons/K - profesjonelt nivå.svg"
import { ReactComponent as IconK2 } from "../icons/K - potensielt brukbar.svg"
import { ReactComponent as IconK1 } from "../icons/K - noe innsikt.svg"
import { ReactComponent as IconK0 } from "../icons/K - ingen.svg"
import { ReactComponent as IconM5 } from "../icons/M - perfekt.svg"
import { ReactComponent as IconM4 } from "../icons/M - godt.svg"
import { ReactComponent as IconM3 } from "../icons/M - ok.svg"
import { ReactComponent as IconM2 } from "../icons/M - nja.svg"
import { ReactComponent as IconM1 } from "../icons/M - egentlig ikke.svg"
import { ReactComponent as IconM0 } from "../icons/M - Nei.svg"

type DescTableProps = {
    heading: string
}

export const DescriptionTable = ({...props}: DescTableProps) => {
    const style = DescTableStyle();

    switch(props.heading) {
    case 'BESKRIVELSE AV KOMPETANSESKALA':
        return (
            <div>
                <div>{props.heading}</div>
                <div className={style.block}>
                    <div className={style.icon}><IconK0/></div>
                        <div className={style.heading}>Kjenner ikke til området</div>
                </div>
                <div className={style.block}>
                    <div className={style.icon}><IconK1/></div>
                    <div className={style.rightBlock}>
                        <div className={style.heading}>Noe innsikt</div>
                        <div className={style.description}>(Har noe innsikt i området, samt evne til å resonnere over eller løse oppgaver på et ikke-profesjonelt nivå innenfor området)</div>
                    </div>
                </div>
                <div className={style.block}>
                    <div className={style.icon}><IconK2/></div>
                    <div className={style.rightBlock}>
                        <div className={style.heading}>Potensielt brukbar kompetanse</div>
                        <div className={style.description}>(Kompetanse som enten ikke er testet i oppdrag eller der man inntil videre trenger støtte fra andre i teamet)</div>
                    </div>
                </div>
                <div className={style.block}>
                    <div className={style.icon}><IconK3/></div>
                    <div className={style.rightBlock}>
                        <div className={style.heading}>Profesjonelt nivå</div>
                        <div className={style.description}>(Har god kontroll og kan jobbe selvstendig med ikke-trivielle problemstillinger innenfor området)</div>
                    </div>
                </div>
                <div className={style.block}>
                    <div className={style.icon}><IconK4/></div>
                    <div className={style.rightBlock}>
                        <div className={style.heading}>Helt / heltinne</div>
                        <div className={style.description}>(Har særdeles god kontroll og en etablert posisjon på området)</div>
                    </div>
                </div>
                <div className={style.block}>
                    <div className={style.icon}><IconK5/></div>
                    <div className={style.rightBlock}>
                        <div className={style.heading}>Ekspert</div>
                        <div className={style.description}>(En etterspurt spesialist, som fungerer som nyskapende eller strategisk kraft på området)</div>
                    </div>
                </div>
            </div>
        );

    case 'BESKRIVELSE AV MOTIVASJONSSKALA':
    return (
        <div>
            <div>{props.heading}</div>
            <div className={style.block}>
                <div className={style.icon}><IconM0/></div>
                    <div className={style.heading}>Nei. Ønsker ikke å jobbe med dette</div>
            </div>
            <div className={style.block}>
                <div className={style.icon}><IconM1/></div>
                    <div className={style.heading}>Egentlig ikke. Ønsker svært lite å jobbe med</div>
            </div>
            <div className={style.block}>
                <div className={style.icon}><IconM2/></div>
                    <div className={style.heading}>Nja. Kan motvillig jobbe med dette</div>
            </div>
            <div className={style.block}>
                <div className={style.icon}><IconM3/></div>
                    <div className={style.heading}>OK. Ikke det jeg liker best, men helt i orden hvis jeg må</div>
            </div>
            <div className={style.block}>
                <div className={style.icon}><IconM4/></div>
                    <div className={style.heading}>Godt. Kjempefint å få jobbe med dette</div>
            </div>
            <div className={style.block}>
                <div className={style.icon}><IconM5/></div>
                    <div className={style.heading}>Perfekt. Dette er akkurat det jeg ønsker meg</div>
            </div>
        </div>
    );
    
    default:
        return(
            <div></div>
        )
    }

}

export default DescriptionTable;