import osmnx as ox

# Download Delhi street map
print("Downloading Delhi map... please wait ⏳")

G = ox.graph_from_place("Delhi, India", network_type="walk")

print("Graph created! ✅")
print("Total nodes (intersections):", len(G.nodes))
print("Total edges (roads):", len(G.edges))