import React from "react";
import styled from "styled-components";
import C from "Root/constants";
import Section from "Root/components/global/Section";
import Card from "Root/app/client/mobile/Home/Showcase/Card";
import Smoke from "Root/public/img/showcase/smoke.svg";
import Comment from "Root/public/img/showcase/comment.svg";
import Eye from "Root/public/img/showcase/eye.svg";
import Plan from "Root/public/img/showcase/plan.svg";

const StyledContainer = styled.div`
  ${C.styles.flex.flexColumnCenter};
  padding: 0 0.5rem 0.5rem;
`;

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
  ];

  const bigCard = {
    title: "you are what you wish for",
    description:
      "Dreaming trains your mind to find what plans and appropriate chanes in life.",
    icon: Smoke,
  };
  return (
    <StyledContainer>
      <Section>
        <Card
          icon={bigCard.icon}
          title={bigCard.title}
          description={bigCard.description}
          width={110}
          flexDirection="column"
          color={C.themes[`${props.auth.theme}`].colors.foreground}
        />
      </Section>
      <Section>
        {cards.map(card => (
          <Card
            icon={card.icon}
            title={card.title}
            description={card.description}
            width={60}
            flexDirection="column"
            color={C.themes[`${props.auth.theme}`].colors.foreground}
          />
        ))}
      </Section>
    </StyledContainer>
  );
};
