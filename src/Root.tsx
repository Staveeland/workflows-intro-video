import { Composition } from "remotion";
import { WorkflowsIntro } from "./Composition";
import { RAGFlow } from "./RAGFlow";
import { DataReporting } from "./DataReporting";
import { Automation } from "./Automation";
import { IntelligentAgents } from "./IntelligentAgents";
import { CustomerService } from "./CustomerService";
import { CustomSolutions } from "./CustomSolutions";
import { SimplePitch } from "./SimplePitch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WorkflowsIntro"
        component={WorkflowsIntro}
        durationInFrames={200}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="RAGFlow"
        component={RAGFlow}
        durationInFrames={600}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="DataReporting"
        component={DataReporting}
        durationInFrames={600}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Automation"
        component={Automation}
        durationInFrames={600}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="IntelligentAgents"
        component={IntelligentAgents}
        durationInFrames={600}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="CustomerService"
        component={CustomerService}
        durationInFrames={600}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="CustomSolutions"
        component={CustomSolutions}
        durationInFrames={600}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="SimplePitch"
        component={SimplePitch}
        durationInFrames={1140}
        fps={30}
        width={3840}
        height={2160}
      />
    </>
  );
};
