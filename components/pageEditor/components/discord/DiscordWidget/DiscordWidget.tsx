import { EditorElement } from "@/types/pageEditor";

type Props = {
  element: EditorElement<any>;
};

export default function DiscordWidgetComponent({ element }: Props) {
  return (
    <iframe
      src={`https://discord.com/widget?id=706492500096974900&theme=dark`}
      width={500}
      height={500}
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      className="iframe"
    />
  );
}
