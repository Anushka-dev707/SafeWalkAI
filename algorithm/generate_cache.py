"""
Generate and cache the Delhi graph
Run this ONCE locally, then commit delhi_graph_cache.pkl to GitHub
This solves the memory issue on Render
"""

import sys
import os

# Add parent dir to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from safewalk import load_graph

if __name__ == "__main__":
    print("=" * 60)
    print("🚀 Generating Delhi Map Cache (First time: 3-5 minutes)")
    print("=" * 60)
    
    # This will download the graph and save it to delhi_graph_cache.pkl
    G = load_graph("Delhi, India")
    
    print("\n" + "=" * 60)
    print("✅ Cache generated successfully!")
    print("   File: delhi_graph_cache.pkl")
    print("\n📤 Next steps:")
    print("   1. Commit and push delhi_graph_cache.pkl to GitHub")
    print("   2. Redeploy on Render")
    print("   3. First request will now load instantly from cache!")
    print("=" * 60)
