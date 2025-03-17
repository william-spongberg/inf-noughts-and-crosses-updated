import * as Layout from "../components/Layout.tsx";
import * as Text from "../components/Text.tsx";
import InfGrid from "../islands/InfGrid.tsx";

export default function Home() {
  return (
    <>
      <Layout.Header title="Infinite Noughts and Crosses" />

      <Layout.Page>
        <InfGrid />
      </Layout.Page>
    </>
  );
}
