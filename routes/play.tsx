import * as Layout from "../components/Layout.tsx";
import * as Text from "../components/Text.tsx";
import Button from "../components/Button.tsx";
import InfGrid from "../islands/InfGrid.tsx";

export default function Play() {
  return (
    <>
      <Layout.Page>
        <div className="w-[90vw] h-[90vh] flex flex-col justify-center items-center">
          <InfGrid />
          <RulesButton />
          <HomeButton />
        </div>
      </Layout.Page>
    </>
  );
}

function HomeButton() {
  return (
    <div className="fixed bottom-0 right-0 scale-90 sm:scale-100 m-2">
      <Button href="/">
        <Text.SubHeading>
          Home
        </Text.SubHeading>
      </Button>
    </div>
  );
}

function RulesButton() {
  return (
    <div className="fixed bottom-0 right-20 sm:right-24 scale-90 sm:scale-100 m-2">
      <Button href="/rules">
        <Text.SubHeading>
          Rules
        </Text.SubHeading>
      </Button>
    </div>
  );
}
