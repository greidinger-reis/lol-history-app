import type { SeasonInfo } from "~/server/types/seasonInfo";

type Props = {
    data: SeasonInfo;
};

export default function SeasonInfo({ data }: Props) {
    return <div>SeasonInfo</div>;
}
