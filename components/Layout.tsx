import { ComponentChildren } from "preact";
import * as Text from "../components/Text.tsx";
import Button from "../components/Button.tsx";
import * as Icons from "../components/Icons.tsx";

// colours
const BACKGROUND_COLOUR = "bg-black";
const HEADER_COLOUR = "bg-black";
const FOOTER_COLOUR = "bg-black";
const ELEMENT_COLOUR = "bg-gray-800";
const BUTTON_COLOUR = "bg-[#F0EBD8]";
const BUTTON_HOVER_COLOUR = "hover:bg-[#F0EBD0]";
const TEXT_COLOUR = "text-white";

// sizes
const ELEMENT_SIZE = "max-w-screen-md";

interface ChildrenProps {
  children: ComponentChildren;
}

interface PageProps {
  colour?: string;
  children: ComponentChildren;
}

export function Page({
  colour = BACKGROUND_COLOUR,
  children,
}: PageProps) {
  return (
    <div
      class={`flex min-h-screen flex-grow ${colour} justify-center items-center`}
    >
      <div
        class={`flex-col flex items-center justify-center mb-9 px-4 sm:px-8 pt-8 pb-8`}
      >
        {children}
      </div>
    </div>
  );
}

interface ElementProps {
  children: ComponentChildren;
  title?: string;
  colour?: string;
  textColour?: string;
  size?: string;
}

export function Element({
  title = "",
  colour = BACKGROUND_COLOUR,
  textColour = TEXT_COLOUR,
  size = ELEMENT_SIZE,
  children,
}: ElementProps) {
  return (
    <div
      class={`lg:px-16 sm:px-8 px-0 lg:py-16 sm:py-8 py-4 mx-auto my-auto ${colour} rounded-2xl w-full ${size}`}
    >
      <Center>
        <Text.Title textColour={textColour}>{title}</Text.Title>
        <br />
        {children}
        <br />
      </Center>
    </div>
  );
}

interface GridProps {
  customGridCols?: string;
  children: ComponentChildren;
}

export function Grid({ children }: GridProps) {
  return (
    <div
      class={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2`}
    >
      {children}
    </div>
  );
}

export function Center({ children }: ChildrenProps) {
  return <div class="flex flex-col justify-center items-center">{children}
  </div>;
}

interface HeaderProps {
  title?: string;
  colour?: string;
  textColour?: string;
}

export function Header({
  title = "",
  colour = HEADER_COLOUR,
  textColour = TEXT_COLOUR,
}: HeaderProps) {
  return (
    <>
      <header
        className={`flex items-center justify-start ${colour} pb-2 px-4 pt-4`}
      >
        {title
          ? (
            <Text.Title textColour={textColour}>
              {title}
            </Text.Title>
          )
          : (
            <Text.Title textColour={textColour}>
              Infinite <div class="text-red-400 inline">Noughts</div> and
              <div class="text-blue-400 inline">{" "}Crosses</div>
            </Text.Title>
          )}
        <div class="ml-auto gap-2 flex">
          <a
            href="https://github.com/william-spongberg/inf-noughts-and-crosses-updated"
            className="hover:bg-gray-700 rounded-full p-2"
          >
            <Icons.GitHub />
          </a>
        </div>
      </header>
    </>
  );
}

interface FooterProps {
  colour?: string;
  textColour?: string;
  author?: string;
  isBeta?: boolean;
}

export function Footer({
  colour = FOOTER_COLOUR,
  textColour = "text-gray-400",
  author = "William Spongberg",
  isBeta = false,
}: FooterProps) {
  return (
    <div class="w-full">
      <footer
        class={`flex flex-col items-center ${colour} ${textColour}`}
      >
        <div class="flex flex-col justify-center items-center p-4">
          {isBeta
            ? (
              <>
                <p class="text-[#748CAB] mb-0">
                  This website is in beta.
                </p>
                <div class="hidden md:block">&nbsp;</div>
              </>
            )
            : null}
          <p>
            &copy; {author} {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
