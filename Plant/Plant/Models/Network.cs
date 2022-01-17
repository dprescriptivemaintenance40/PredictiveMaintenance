using System.ComponentModel.DataAnnotations.Schema;

namespace Plant.Models
{
    public class Network
    {
        public int NetworkId { get; set; }
        public int PlantId { get; set; }
        public List<Equipment> equipmentList { get; set; }
        public List<Edge> edges { get; set; }
        public Plants plant { get; set; }

        [NotMapped]
        public Dictionary<int, List<string>> _adjList = new Dictionary<int, List<string>>();

        [NotMapped]
        public Dictionary<int, List<int>> _network = new Dictionary<int, List<int>>();

        [NotMapped]
        public Dictionary<int, List<int>> _networkPath = new Dictionary<int, List<int>>();

        [NotMapped]
        public int MachineCount { get; set; }

        [NotMapped]
        public Dictionary<int, List<List<int>>> _referenceCombinationList = new Dictionary<int, List<List<int>>>();

        [NotMapped]
        public List<List<List<int>>> _CombinationList = new List<List<List<int>>>();


        public List<Equipment> AddEdgeToEquipment(List<Equipment> equipmentLists, List<Edge> edgeLists)
        {

            foreach (var item in edgeLists)
            {
                int EqiIndex = equipmentLists.IndexOf(equipmentLists.Single(i => i.TagNumber == item.SrcId));
                equipmentLists[EqiIndex]._next.Add(item);
                EqiIndex = equipmentLists.IndexOf(equipmentLists.Single(i => i.TagNumber == item.DestinationId));
                equipmentLists[EqiIndex]._previous.Add(item);
            }

            return equipmentLists;
        }


        public void AddEdgesToAdjacencyList(Edge edge, Network nwt, bool isDirected = false)
        {
            List<int> nodes = new List<int>();
            List<int> nodesPath = new List<int>();
            List<string> adjNodes = new List<string>();
            if (nwt._network.ContainsKey(edge.SrcId) || nwt._networkPath.ContainsKey(edge.SrcId))
            {
                nodes = nwt._network[edge.SrcId];
                nodes.Add(edge.DestinationId);
                nwt._network[edge.SrcId] = nodes;

                nodesPath = nwt._networkPath[edge.SrcId];
                nodesPath.Add(edge.DestinationId);
                nwt._networkPath[edge.SrcId] = nodesPath;
            }
            else
            {
                nodes.Add(edge.DestinationId);
                nwt._network.Add(edge.SrcId, nodes);

                nodesPath.Add(edge.DestinationId);
                nwt._networkPath.Add(edge.SrcId, nodesPath);
            }


            if (nwt._adjList.ContainsKey(edge.SrcId))
            {
                adjNodes = nwt._adjList[edge.SrcId];
                string Tupple = "(" + edge.DestinationId + " , " + edge.Destination + ")";
                adjNodes.Add(Tupple);
                nwt._adjList[edge.SrcId] = adjNodes;
            }
            else
            {
                string Tupple = "(" + edge.DestinationId + " , " + edge.Destination + ")";
                adjNodes.Add(Tupple);
                nwt._adjList.Add(edge.SrcId, adjNodes);
            }


            adjNodes = new List<string>();
            if (isDirected == false)
            {
                if (nwt._adjList.ContainsKey(edge.DestinationId))
                {
                    adjNodes = nwt._adjList[edge.DestinationId];
                    string Tupple = "(" + edge.SrcId + " , " + edge.Src + ")";
                    adjNodes.Add(Tupple);
                    nwt._adjList[edge.DestinationId] = adjNodes;
                }
                else
                {
                    string Tupple = "(" + edge.SrcId + " , " + edge.Src + ")";
                    adjNodes.Add(Tupple);
                    nwt._adjList.Add(edge.DestinationId, adjNodes);
                }

            }



        }

        public void printAllPaths(Network nwt, int s, int d)
        {
            List<bool> visited = new List<bool>();
            for (int i = 0; i < nwt.MachineCount; i++)
            {
                visited.Add(false);
            }
            int index = 1;  // Machine count always starts with 1 and 1 is used as key in dictionary

            //In class Network their is two network paths first is _network and another _networkPath
            // During adding edges we store edge destination in both _network as well as _networkPath
            // at runtime we cannot edit list which is in ForLoop i.e _network so for that purpose make second list _networkPath

            // Main custom logic to add combinations
            // suposse their is 2 Machines lets say M1 = 1 and M2 = 2  so combination will be  [ 1 , 2, (1, 2) ]
            // we cannot make tupple (1,2) as index to treat combinations like (1,2)
            // so i have treated them as another machine, suppose we have 11 machines  then combination (1,2) = 12th Machine

            // suppose we have 11 machine therefore machine 11 does not have any destination edge so 
            // machine 10 will have as destination 11    
            // During path traversing, if we have 11 machines then we have to start from 1 to 11 , 
            // now we have Machine 12 and 13 wich is combination of (1,2) and (7,8)
            // this is not actual machine we have assumed just only



            //to break the path after last machine so we have last machine path empty i.e 11= []
            //self._networkPath[len(self._networkPath) + 1] =[]
            List<int> nodes = new List<int>();
            nwt._networkPath.Add(nwt._networkPath.Count() + 1, nodes);
            //Here will traverse te machine edges if we get machine will more than 1 destination nodes then we will find
            //the combinations of it  

            foreach (var item in nwt._network)
            {
                if (item.Value.Count > 1)
                {
                    // here more than on edge will go to function  r.Subset and will get combination list in cmb
                    // already list have single combinations so combination will get of size 2 and 2+

                    Combination cmb = new Combination();
                    for (int i = 2; i <= item.Value.Count; i++)   // i defines the tupple count, already we have count 1 so  started from 2 i.e i=2 for e.g (2,4)
                    {
                        var combinations = new List<List<int>>();
                        foreach (var combi in cmb.printCombination(item.Value, item.Value.Count, i))
                        {
                            combinations.Add(combi);
                        }
                        // here combination should have multiple list


                        foreach (var c in combinations)
                        {
                            // we are taking the current _networkPath length which means existing number of machines 
                            // As said combination will treat as mahine 
                            // so for each combinataion will treat as machine

                            int nwtLength = nwt._networkPath.Count + 1;
                            visited.Add(false);

                            // the current machine which have multiple destination edge, in that will add new created Machine number into it  

                            List<int> allNodes = nwt._networkPath[index];
                            allNodes.Add(nwtLength);
                            nwt._networkPath[index] = allNodes;


                            // to create new Machine list[]

                            if (!nwt._referenceCombinationList.ContainsKey(nwtLength))
                            {
                                List<List<int>> node = new List<List<int>>();
                                nwt._referenceCombinationList.Add(nwtLength, node);
                            }

                            // _referenceCombinationList is used to maintain  the assumed machine number for which combinaton to replace the assumed machine with their combination

                            List<List<int>> refNodes = nwt._referenceCombinationList[nwtLength];
                            refNodes.Add(c);
                            nwt._referenceCombinationList[nwtLength] = refNodes;


                            if (!nwt._networkPath.ContainsKey(nwtLength))
                            {
                                List<int> node = new List<int>();
                                nwt._networkPath.Add(nwtLength, node);
                            }

                            foreach (var cChild in c)
                            {
                                foreach (var child in nwt._networkPath[cChild])
                                {
                                    List<int> childNodes = nwt._networkPath[nwtLength];
                                    childNodes.Add(child);
                                }
                            }

                            // to remove same destination node from list

                            List<int> removeDuplicates = new List<int>();
                            removeDuplicates = nwt._networkPath[nwtLength];
                            removeDuplicates = removeDuplicates.Distinct().ToList();
                            nwt._networkPath[nwtLength] = removeDuplicates;

                            //if(removeDuplicates.Count() > 1)
                            //{
                            // Advanced code
                            //}
                        }
                    }
                }

                index = index + 1;
            }

            List<int> path = new List<int>();
            printAllPathsUtil(s, d, visited, path, nwt);
        }



        static void printAllPathsUtil(int u, int d, List<bool> visited, List<int> path, Network nwt)
        {
            path.Add(u);
            if (u.Equals(d))
            {
                List<List<int>> tempPath = new List<List<int>>();
                foreach (var item in path)
                {
                    if (nwt._referenceCombinationList.ContainsKey(item))
                    {
                        List<List<int>> nodes = nwt._referenceCombinationList[item];
                        tempPath.Add(nodes[0]);
                    }
                    else
                    {
                        tempPath.Add(new List<int> { item });
                    }

                }
                nwt._CombinationList.Add(tempPath);
                return;
            }

            visited[u] = true;
            foreach (int i in nwt._networkPath[u])
            {
                if (!visited[i])
                {
                    printAllPathsUtil(i, d, visited,
                                      path, nwt);
                    path.Remove(i);
                }
            }
            visited[u] = false;
        }
    }
}
