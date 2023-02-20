/* eslint @typescript-eslint/no-misused-promises: 0 */
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { _Region } from "~/constants/regions";
import { formatWhiteSpacesToUrl } from "~/utils/formatWhiteSpace";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { regionParamSchema } from "~/utils/parseRegionParam";

const summonerSchema = z.object({
    summonerName: z
        .string()
        .min(3, "Summoner name must contain at least 3 characters")
        .max(16, "Summoner name must contain at most 16 characters"),
    region: regionParamSchema,
});

type SummonerForm = z.infer<typeof summonerSchema>;

const Home: NextPage = () => {
    const router = useRouter();
    const form = useForm<SummonerForm>({
        resolver: zodResolver(summonerSchema),
        criteriaMode: "all",
    });

    async function onSubmit(data: SummonerForm) {
        const { region, summonerName } = data;
        const parsedSummonerName = formatWhiteSpacesToUrl(summonerName);
        await router.push(`/${region}/${parsedSummonerName}`);
    }

    return (
        <>
            <Head>
                <title>LoL Match History</title>
                <meta
                    name="description"
                    content="League of Legends summoner match history lookup"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex h-screen flex-col items-center justify-center gap-1">
                <form className="w-full max-w-3xl"onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="input-group w-full">
                        <select
                            className="select-primary select bg-white text-primary"
                            {...form.register("region", { required: true })}
                        >
                            <option disabled selected>
                                Region
                            </option>
                            {Object.keys(_Region).map((region) => (
                                <option key={region} value={region}>
                                    {region.toUpperCase()}
                                </option>
                            ))}
                        </select>
                        <input
                            className="input-primary input bg-white w-full"
                            type="search"
                            placeholder={"Summoner name"}
                            {...form.register("summonerName", {
                                required: true,
                            })}
                        />
                        <button
                            className="btn-outline btn-primary btn bg-white"
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </form>
                {form.formState.errors.summonerName && (
                    <p className="text-xs text-red-500">
                        {form.formState.errors.summonerName.message}
                    </p>
                )}
                {form.formState.errors.region && (
                    <p className="text-xs text-red-500">
                        Please select a region
                    </p>
                )}
            </main>
        </>
    );
};

export default Home;
