import TimeRSC from "@/components/demos/time-rsc";
import TimeCSR from "@/components/demos/time-csr";
import TimeStreaming from "@/components/demos/time-streaming";
import SecretsRSC from "@/components/demos/secrets-rsc";
import SecretsCSR from "@/components/demos/secrets-csr";
import State from "@/components/demos/state";

import { Effects } from "@/components/demos/effects";
import { PropsComponent } from "@/components/demos/props";
import { Memo } from "@/components/demos/memo";
import { Callback } from "@/components/demos/callback";
import { Refs } from "@/components/demos/refs";

import { Code } from "@/components/code";
import { Row } from "@/components/row";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Row>
        <PropsComponent name="John" age={20} />
        <div>
          <Code path="/components/demos/props.tsx" />
          <Code path="/app/demos/page.tsx" sub={[20, 21]} />
        </div>
      </Row>
      <Row>
        <State />
        <Code path="/components/demos/state.tsx" />
      </Row>
      <Row>
        <Effects />
        <Code path="/components/demos/effects.tsx" />
      </Row>
      <Row>
        <Memo />
        <Code path="/components/demos/memo.tsx" />
      </Row>
      <Row>
        <Callback />
        <Code path="/components/demos/callback.tsx" />
      </Row>
      <Row>
        <Refs />
        <Code path="/components/demos/refs.tsx" />
      </Row>
      <Row>
        <TimeRSC />
        <div>
          <Code path="/components/demos/time-rsc.tsx" />
          <Code path="/lib/actions.ts" sub={[13, 20]} />
        </div>
      </Row>
      <Row>
        <TimeCSR />
        <Code path="/components/demos/time-csr.tsx" />
      </Row>
      <Row>
        <TimeStreaming />
        <div>
          <Code path="/components/demos/time-streaming.tsx" />
          <Code path="/components/demos/time-streaming-csr.tsx" />
        </div>
      </Row>
      <Row>
        <SecretsRSC />
        <div>
          <Code path="/components/demos/secrets-rsc.tsx" />
          <Code path="/lib/actions.ts" sub={[9, 12]} />
        </div>
      </Row>
      <Row>
        <SecretsCSR />
        <Code path="/components/demos/secrets-csr.tsx" />
      </Row>
    </div>
  );
}
