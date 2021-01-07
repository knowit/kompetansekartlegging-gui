import React from 'react'
import * as Icon from '../icons/iconController';
import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import CloseIcon from '@material-ui/icons/Close';


const DescTableStyle = makeStyles({
    root: {
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',

    },
    scaleRow: {
        height: '50%',
        display: 'flex',
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    scaleTitle: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: 10,
        fontWeight: 'bold',
        width: '10%'
    },
    containerMotivation: {
        display: 'flex',
        flex: 1,
        flexGrow: 5,
        flexDirection: 'column',
    },
    containerCompetence: {
        display: 'flex',
        flex: 1,
        flexGrow: 5,
        flexDirection: 'column',
        padding: 5
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
    },


});


type ScaleContainerProps = {
    icon: JSX.Element,
    heading: string,
    text: string,
    isMotivation: boolean
}

type ScaleContainerObject = {
    icon: JSX.Element,
    heading: string,
    text: string,
}

export const DescriptionTableMobile = () => {
    const style = DescTableStyle();

    // Possibly a better way to do this...
    const COMPETENCE : ScaleContainerObject[] = [
        {icon: <Icon.K0 className={style.iconArea} />, heading: 'Kjenner ikke til området', text: ''}, 
        {icon: <Icon.K1 className={style.iconArea} />, heading: 'Noe innsikt', text: '(Har noe innsikt i området, samt evne til å resonnere over eller løse oppgaver på et ikke-profesjonelt nivå innenfor området)'}, 
        {icon: <Icon.K2 className={style.iconArea} />, heading: 'Potensielt brukbar kompetanse', text: '(Kompetanse som enten ikke er testet i oppdrag eller der man inntil videre trenger støtte fra andre i teamet)'}, 
        {icon: <Icon.K3 className={style.iconArea} />, heading: 'Profesjonelt nivå', text: '(Har god kontroll og kan jobbe selvstendig med ikke-trivielle problemstillinger innenfor området)'}, 
        {icon: <Icon.K4 className={style.iconArea} />, heading: 'Superstjerne', text: '(Har særdeles god kontroll og en etablert posisjon på området)'}, 
        {icon: <Icon.K5 className={style.iconArea} />, heading: 'Ekspert', text: '(En etterspurt spesialist, som fungerer som nyskapende eller strategisk kraft på området)'}, 
    ]

    const MOTIVATION : ScaleContainerObject[] = [
        {icon: <Icon.M0 className={style.iconArea} />, heading: 'Nei. Ønsker ikke å jobbe med dette', text: ''}, 
        {icon: <Icon.M1 className={style.iconArea} />, heading: 'Egentlig ikke. Ønsker svært lite å jobbe med', text: ''}, 
        {icon: <Icon.M2 className={style.iconArea} />, heading: 'Nja. Kan motvillig jobbe med dette', text: ''}, 
        {icon: <Icon.M3 className={style.iconArea} />, heading: 'OK. Ikke det jeg liker best, men helt i orden hvis jeg må', text: ''}, 
        {icon: <Icon.M4 className={style.iconArea} />, heading: 'Godt. Kjempefint å få jobbe med dette', text: ''}, 
        {icon: <Icon.M5 className={style.iconArea} />, heading: 'Perfekt. Dette er akkurat det jeg ønsker meg', text: ''}, 
    ]

    const ScaleContainer = ({...props} : ScaleContainerProps) => (
        <div className={props.isMotivation ? style.containerMotivation : style.containerCompetence}>
            <div className={style.bottom}>
                <div className={style.iconArea}>{props.icon}</div>
                <div className={style.textBlock}>
                    <div className={style.heading}>{props.heading}</div>
                    <div className={style.text}>{props.text}</div>
                </div>
            </div>
        </div>
    )


    return (
        <div className={style.root}>
            <div className={style.scaleRow}>
                <div className={style.scaleTitle}>
                    <div>KOMPETANSESKALA</div>
                </div>
                {
                    COMPETENCE.map((obj) => (<ScaleContainer icon={obj.icon} heading={obj.heading} text={obj.text} isMotivation={false}/>))
                }
            </div>
            <div className={style.scaleRow}>
                <div className={style.scaleTitle}>
                    <div>MOTIVASJONSSKALA</div>
                </div>
                {
                    MOTIVATION.map((obj) => (<ScaleContainer icon={obj.icon} heading={obj.heading} text={obj.text} isMotivation={true}/>))
                }
            </div>
        </div>
    );

}

export default DescriptionTableMobile;