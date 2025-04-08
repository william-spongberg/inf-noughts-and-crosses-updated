import Button from "../components/Button.tsx";
import * as Layout from "../components/Layout.tsx";
import * as Text from "../components/Text.tsx";

export default function Rules() {
  return (
    <>
      <Layout.Page>
        <Layout.Element>
          <Text.Heading>
            Rules
          </Text.Heading>
          <Text.Paragraph>
            <a
              class="underline"
              href="https://en.wikipedia.org/wiki/Tic-tac-toe"
            >
              Normal rules
            </a>{" "}
            for Noughts and Crosses apply, except:
          </Text.Paragraph>
          <Text.List>
            <li>
              The game board can now be infinitely extended! You can sacrifice a
              turn to extend the board by a row or column in any direction.
            </li>
            <li>
              You need 4 in a row to win, instead of 3.
            </li>
            <li>
              Every play must be vertically or horizontally adjacent to the last
              one.
            </li>
            <li>
              If you cannot play a piece, you lose.
            </li>
            <li>
              You can choose to bank a turn and use it later.
            </li>
          </Text.List>
          <Text.Paragraph>
            The purpose of this game is to make playing more strategic and
            meaningful. You must now think ahead and play carefully. Have fun!
          </Text.Paragraph>
          <Button href="/play">
            <Text.SubHeading>
              I understand
            </Text.SubHeading>
          </Button>
        </Layout.Element>
      </Layout.Page>
    </>
  );
}
