# import osmnx as ox
# import networkx as nx
# import numpy as np

# # Load graph once
# print("Loading Delhi map... ⏳")
# G = ox.graph_from_place("Delhi, India", network_type="walk")

# # Add safety weights
# for u, v, data in G.edges(data=True):
#     crime_score = np.random.uniform(0, 1)
#     lighting_score = np.random.uniform(0, 1)
#     crowd_score = np.random.uniform(0, 1)

#     data['safety_weight'] = round(
#         (0.5 * crime_score) +
#         (0.3 * (1 - lighting_score)) +
#         (0.2 * (1 - crowd_score)), 4
#     )

# print("Graph ready! ✅")


# def get_routes(start_lat, start_lon, end_lat, end_lon):

#     start_node = ox.nearest_nodes(G, start_lon, start_lat)
#     end_node = ox.nearest_nodes(G, end_lon, end_lat)

#     safest_path = nx.dijkstra_path(G, start_node, end_node, weight='safety_weight')
#     shortest_path = nx.shortest_path(G, start_node, end_node, weight='length')

#     def convert(path):
#         coords = []
#         for node in path:
#             coords.append({
#                 "lat": G.nodes[node]['y'],
#                 "lon": G.nodes[node]['x']
#             })
#         return coords

#     return {
#         "safest_route": convert(safest_path),
#         "shortest_route": convert(shortest_path),
#         "safest_length": len(safest_path),
#         "shortest_length": len(shortest_path)
#     }

import sys
import os

# Algorithm folder ka path add karo
sys.path.append(os.path.join(os.path.dirname(__file__), '../../algorithm'))

from safewalk import load_graph, get_safest_route
import networkx as nx

# Lazy load graph - only load on first request to save memory
G = None

def ensure_graph_loaded():
    global G
    if G is None:
        print("Loading Delhi map... ⏳")
        G = load_graph()
        print("Graph ready! ✅")
    return G


def get_routes(start_lat, start_lon, end_lat, end_lon):
    # Ensure graph is loaded before processing
    G = ensure_graph_loaded()
    
    # Safest route — tumhara algorithm
    safest = get_safest_route(start_lat, start_lon, end_lat, end_lon, G)

    # Shortest route — normal distance
    import osmnx as ox
    start_node = ox.nearest_nodes(G, start_lon, start_lat)
    end_node = ox.nearest_nodes(G, end_lon, end_lat)
    shortest_path = nx.shortest_path(G, start_node, end_node, weight='length')

    # Calculate distance and time for shortest route
    shortest_distance = 0
    for i in range(len(shortest_path) - 1):
        u = shortest_path[i]
        v = shortest_path[i + 1]
        edge_data = G.get_edge_data(u, v)
        if edge_data:
            shortest_distance += edge_data[0].get('length', 0)

    walking_speed = 1.4  # meters per second
    shortest_time_minutes = round(shortest_distance / walking_speed / 60, 1)

    shortest_coords = []
    for node in shortest_path:
        shortest_coords.append({
            "lat": G.nodes[node]['y'],
            "lon": G.nodes[node]['x']
        })

    return {
        "safest_route": safest['route'],
        "shortest_route": shortest_coords,
        "safest_length": safest['total_stops'],
        "shortest_length": len(shortest_coords),
        "safety_score": safest['safety_score'],
        "safest_distance_km": safest['distance_km'],
        "safest_time_minutes": safest['time_minutes'],
        "shortest_distance_km": round(shortest_distance / 1000, 2),
        "shortest_time_minutes": shortest_time_minutes
    }