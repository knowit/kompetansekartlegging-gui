import { makeStyles } from "@material-ui/core";
import React from "react";
import { QuestionType } from "../API";
import { AnswerDiagramProps, ChartData, QuestionAnswer } from "../types";
import { CombinedChart } from "./CombinedChart";
import { CombinedChartMobile } from "./CombinedChartMobile";

const answerDiagramStyle = makeStyles({
    answerDiagramContainer: {
        paddingBottom: 50,
    },
});

interface Scores {
    valueKnowledge: number[];
    valueMotivation: number[];
}

const scores = (
    quAns: QuestionAnswer,
    knowledgeStart: number,
    motivationStart: number
): Scores => {
    if (quAns.question.type === QuestionType.customScaleLabels) {
        return {
            valueKnowledge: [
                knowledgeStart,
                knowledgeStart + (quAns.customScaleValue === -1 ? 0 : quAns.customScaleValue),
            ],
            valueMotivation: [
                motivationStart,
                motivationStart + (quAns.customScaleValue === -1 ? 0 : quAns.customScaleValue),
            ],
        }
    }

    return {
        valueKnowledge: [
            knowledgeStart,
            knowledgeStart + (quAns.knowledge === -1 ? 0 : quAns.knowledge),
        ],
        valueMotivation: [
            motivationStart,
            motivationStart + (quAns.motivation === -1 ? 0 : quAns.motivation),
        ],
    };
};

export default function AnswerDiagram({ ...props }: AnswerDiagramProps) {
    const styles = answerDiagramStyle();

    let knowledgeStart = props.isMobile ? 7 : 0;
    let motivationStart = props.isMobile ? 0 : 7;
    let chartData: ChartData[] =
        props.questionAnswers.get(props.activeCategory)?.map((quAns) => {
            return {
                questionType: quAns.question.type,
                name: quAns.question.topic,
                ...scores(quAns, knowledgeStart, motivationStart)
            };
        }) || [];

    return props.isMobile ? (
        <CombinedChartMobile chartData={chartData} />
    ) : (
        <div className={styles.answerDiagramContainer}>
            <CombinedChart chartData={chartData} />
        </div>
    );
}
