import React from 'react'
import * as Icon from '../icons/iconController';
import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';

const DescTableStyle = makeStyles({
    root: {
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '50px 50px 0px 50px',
        backgroundColor: KnowitColors.beige,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

    },
    scaleRow: {
        height: '50%',
        display: 'flex',
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        // backgroundColor: KnowitColors.ecaluptus

    },
    scaleTitle: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: 10,
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '10%'
    },
    container: {
        display: 'flex',
        flex: 1,
        flexGrow: 5,
        flexDirection: 'column',
        padding: 5
    },
    top: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 10,
        paddingBottom: 20
    },
    bottom: {
        display: 'flex'
    },
    iconArea: {
        height: 30,
        paddingRight: 5
    },
    icon: {
        height: "100%"
    },
    textBlock: {
        display: 'flex',
        flexDirection: 'column'
    },
    heading: {
        textAlign: 'left',
        fontSize: 10,
        fontWeight: 'bold'
    },
    text: {
        textAlign: 'left',
        fontSize: 10
    }
});

export const DescriptionTableMobile = () => {
    const style = DescTableStyle();

    return (
        <div className={style.root}>
            <div className={style.scaleRow}>
                <div className={style.scaleTitle}>
                    <div>KOMPETANSESKALA</div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                        <div className={style.iconArea}><Icon.K0 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Kjenner ikke til området</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K1 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Noe innsikt</div>
                            <div className={style.text}>(Har noe innsikt i området, samt evne til å resonnere over eller løse oppgaver på et ikke-profesjonelt nivå innenfor området)</div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K2 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Potensielt brukbar kompetanse</div>
                            <div className={style.text}>(Kompetanse som enten ikke er testet i oppdrag eller der man inntil videre trenger støtte fra andre i teamet)</div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K3 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Profesjonelt nivå</div>
                            <div className={style.text}>(Har god kontroll og kan jobbe selvstendig med ikke-trivielle problemstillinger innenfor området)</div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.K4 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Superstjerne</div>
                            <div className={style.text}>(Har særdeles god kontroll og en etablert posisjon på området)</div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
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
                    <div className={style.bottom}>
                        <div className={style.iconArea}><Icon.M0 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Nei. Ønsker ikke å jobbe med dette</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M1 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Egentlig ikke. Ønsker svært lite å jobbe med</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M2 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Nja. Kan motvillig jobbe med dette</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M3 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>OK. Ikke det jeg liker best, men helt i orden hvis jeg må</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.bottom}>
                    <div className={style.iconArea}><Icon.M4 className={style.iconArea} /></div>
                        <div className={style.textBlock}>
                            <div className={style.heading}>Godt. Kjempefint å få jobbe med dette</div>
                            <div className={style.text}></div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
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

export default DescriptionTableMobile;