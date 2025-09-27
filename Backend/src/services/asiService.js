export async function fetchRWAValuation(assetId, assetType) {
   const res = await fetch("https://api.asi1.ai/v1/chat/completions", {
      method: "POST",
      headers: {
         "Authorization": `Bearer ${process.env.ASI_ONE_API_KEY}`,
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         model: "asi1-mini",
         messages: [
            {
               role: "user",
               content:
`
Objective:
Provide the verified, realtime, onchain value of a specific RWA. This value will serve as an oracle price for a decentralized lending protocol.

Instructions:
> The asset to be valued is id:'${assetId}', a type:'${assetType}'.
> Discover and consult a minimum of three independent, reputable off-chain data agents for realtime market data on the asset. Calculate a weighted average of the values obtained. Discard any data points that are extreme outliers.
> Your final output must be a single, structured JSON object. Do not include any conversational text.

Required JSON Output Schema:
{
   "asset_id": "{asset_id}",
   "asset_type": "{asset_type}",
   "valuation_timestamp": "{current_timestamp_ISO_8601}",
   "final_value_USD": "{final_calculated_value}",
   "confidence_score": "{a_score_from_1_to_100}",
   "data_sources_used": [
      {
      "agent_name": "{source_name_1}",
      "value_received": "{value_1}"
   },
   {
      "agent_name": "{source_name_2}",
      "value_received": "{value_2}"
   }
   ]
}
`
            }
         ]
      })
   });

   const data = await res.json();
   const rawJson = data.choices[0].message.content.trim();
   return JSON.parse(rawJson);
}
