import {Client} from "@elastic/elasticsearch";

interface InitIndicesArgs {
  indices: string[],
  elasticsearch: Client
}

async function initIndices({indices, elasticsearch}: InitIndicesArgs) {
  for (let index of indices) {
    const existsResponse = await elasticsearch.indices.exists({index});
    if (!existsResponse.body) {
      await elasticsearch.indices.create({index})
    }
  }
}

export default initIndices;