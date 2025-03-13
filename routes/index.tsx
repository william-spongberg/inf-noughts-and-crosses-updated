import * as Layout from "../components/Layout.tsx";
import * as Text from "../components/Text.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Infinite Noughts and Crosses</title>
      </Head>

      <Layout.Page>
        <Text.Title>
          Hi!
        </Text.Title>
      </Layout.Page>
    </>
  );
}
