import type { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Page from "./hoc/Page";
import { BallotContext } from "../provider/BallotProvider";


const Home: NextComponentType = () => {
  const { account, connect, getCandidates } = useContext(BallotContext);
  const router = useRouter();

  useEffect(() => {
    getCandidates();
    // if(account) {
    //   router.push('/candidates')
    // }
  });

  return (
    <Page>
      <div className="text-center">
        <button
          className="px-4 py-3 text-white rounded-full bg-blue-600 font-medium"
          onClick={connect}
        >
          Login with Asgardian ID
        </button>
        <div>
          <sub>Metamask is used in place of a blockchain ID system
            <br />Please login with a test account
          </sub>
        </div>
      </div>
    </Page>
  );
};

export default Home;
