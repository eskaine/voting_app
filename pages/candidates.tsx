import type { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Page from "./hoc/Page";
import { BallotContext } from "../provider/BallotProvider";
import { CheckIcon, XIcon } from '@heroicons/react/solid';


const Candidates: NextComponentType = () => {
  // const { getCandidates } = useContext(BallotContext);
  // const router = useRouter();

  // useEffect(() => {
  //   if(!connectedAccount) {
  //     router.push('/')
  //   } else {
  //     getUserVote();
  //   }
  // });

  return (
    <Page>
      <div className="w-96">
        <div className="pb-10 text-center text-4xl text-slate-900 font-bold">Candidates List</div>
        <div className="flex flex-col gap-5">
          {/* {candidates.map((candidate: Candidate, i: number) => (
            <div className="h-100 flex flex-row items-center">
              <div className="basis-3/4 flex items-center gap-5">
                <div className={`portrait candidate-${candidate.id}`}></div>
                <div className="text-xl text-slate-700 font-bold">{candidate.name}</div>
              </div>
              <div className="basis-1/4">
                {!userVote.vote ? 
                  <button className="px-6 py-2 text-white rounded-full bg-blue-600 font-medium" onClick={() => castVote(candidate.id)}>
                    Vote
                  </button> :
                  (userVote.vote === i + 1? <CheckIcon className="h-12 w-12 text-green-500 font-bold"/> : <XIcon className="h-12 w-12 text-red-500 font-bold"/>)
                }
              </div>
            </div>
          ))} */}
        </div>
      </div>

    </Page>
  );
};

export default Candidates;
            
       

