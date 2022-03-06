/**
 * There are n networks nodes labelled 1 to N
 *
 * Given a times array, containing edges represented by
 * arrays [u,v,w] where u is the source node, v is the
 * target node, and w is the time taken to travel from the
 * source node to the target node.
 *
 * Send a signal from node k, return how long it takes for
 * all nodes to receive the signal. Return -1  if it's
 * impossible
 *
 * n=5 nodes=1,2,3,4,5
 *
 * times = [[1,2,9],[1,4,2],[2,5,1],[4,2,4],[4,5,6],[3,2,3],[5,3,7],[3,1,5]]
 * 
 * !Constraints
 * 
 * Can the graph be unconnected? Yes
 * Can the time be negative integers? No, always positive
 * 
 * %Test cases
 * Best case, prev section
 * 
 * n=3 k=2 times=[[2,3,4]] -> -1
 * 
 * n=3 k=1 times=[[1,2,8],[3,1,3]] -> -1
 * 
 * 
 */
