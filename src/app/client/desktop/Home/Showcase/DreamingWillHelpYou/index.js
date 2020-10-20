import React from "react"
import styled from "styled-components"
import C from "Root/constants"
import Section from "Root/components/global/Section"
import Card from "Root/app/client/desktop/Home/Showcase/Card"
import Smoke from "Root/public/img/showcase/smoke.svg"
import Comment from "Root/public/img/showcase/comment.svg"
import Eye from "Root/public/img/showcase/eye.svg"
import Plan from "Root/public/img/showcase/plan.svg"

const StyledContainer = styled.div`
    ${C.styles.flex.flexRowCenter};
    width: 60rem;
    padding: 0 0.5rem 0.5rem;
`

export default props => {
    const cards = [
        {
            title: "others answers",
            description:
                "Never underestimate internet's power at finding friends, help and etc.",
            icon: Comment,
        },
        {
            title: "watch others life",
            description:
                "Lots of dreams are thrown to your mind with the purpose of happiness.",
            icon: Eye,
        },
        {
            title: "plan if you havent",
            description:
                "Life is best used with plans.Wishing is the easiest way to set your ideal.",
            icon: Plan,
        },
    ]

    const bigCard = {
        title: "you are what you wish for",
        description:
            "Dreaming trains your mind to find what plans and appropriate chanes in life.",
        icon: Smoke,
    }
    return (
        <StyledContainer>
            <Section width="60%">
                {cards.map(card => (
                    <Card
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                        width={80}
                        color={
                            C.themes[`${props.auth.theme}`].colors.foreground
                        }
                    />
                ))}
            </Section>
            <Section width="35%">
                <Card
                    icon={bigCard.icon}
                    title={bigCard.title}
                    description={bigCard.description}
                    width={150}
                    flexDirection="column"
                    color={C.themes[`${props.auth.theme}`].colors.foreground}
                />
            </Section>
        </StyledContainer>
    )
}
