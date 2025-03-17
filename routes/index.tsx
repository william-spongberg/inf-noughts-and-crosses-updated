import Button from "../components/Button.tsx";
import * as Layout from "../components/Layout.tsx";
import * as Text from "../components/Text.tsx";
import InfGrid from "../islands/InfGrid.tsx";

export default function Home() {
  return (
    <>
      <Layout.Header title="Infinite Noughts and Crosses" />

      <Layout.Page>
        <Button href="/play">
          <Text.Heading>
            Play Game
          </Text.Heading>
        </Button>
        <Button href="/rules">
          <Text.Heading>
            Rules
          </Text.Heading>
        </Button>
        <br/>
        <Text.Small>
          Note: This website is not currently optimised for mobile.
        </Text.Small>
      </Layout.Page>
    </>
  );
}
