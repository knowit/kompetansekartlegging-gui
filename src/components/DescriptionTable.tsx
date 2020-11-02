import React from 'react'
import { DescTableStyle } from '../styles';
import * as Icon from '../icons/iconController';

export const DescriptionTable = () => {
    const style = DescTableStyle();

    return (
        <div className={style.root}>
            <div className={style.scaleRow}>
                <div className={style.scaleTitle}>
                    <div>KOMPETANSESKALA</div>
                </div>
                <div className={style.container}>
                    <div className={style.top}>0</div>
                    <div className={style.bottom}>
                        <div className={style.iconArea}><Icon.K0 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Kjenner ikke til området</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}>1</div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K1 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Noe innsikt</div>
                            <div className={style.text}>(Har noe innsikt i området, samt evne til å resonnere over eller løse oppgaver på et ikke-profesjonelt nivå innenfor området)</div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}>2</div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K2 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Potensielt brukbar kompetanse</div>
                            <div className={style.text}>(Kompetanse som enten ikke er testet i oppdrag eller der man inntil videre trenger støtte fra andre i teamet)</div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}>3</div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K3 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Profesjonelt nivå</div>
                            <div className={style.text}>(Har god kontroll og kan jobbe selvstendig med ikke-trivielle problemstillinger innenfor området)</div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}>4</div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K4 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Superstjerne</div>
                            <div className={style.text}>(Har særdeles god kontroll og en etablert posisjon på området)</div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}>5</div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K5 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Ekspert</div>
                            <div className={style.text}>(En etterspurt spesialist, som fungerer som nyskapende eller strategisk kraft på området)</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.scaleRow}>
                <div className={style.scaleTitle}>
                    <div>MOTIVASJONSSKALA</div>
                </div>
                <div className={style.container}>
                    <div className={style.top}></div>
                    <div className={style.bottom}>
                        <div className={style.iconArea}><Icon.M0 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Nei. Ønsker ikke å jobbe med dette</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}></div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M1 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Egentlig ikke. Ønsker svært lite å jobbe med</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}></div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M2 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Nja. Kan motvillig jobbe med dette</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}></div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M3 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>OK. Ikke det jeg liker best, men helt i orden hvis jeg må</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}></div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M4 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Godt. Kjempefint å få jobbe med dette</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.top}></div>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M5 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Perfekt. Dette er akkurat det jeg ønsker meg</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DescriptionTable;