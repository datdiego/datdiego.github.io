import json
from scholarly import scholarly

def fetch_publications(scholar_id):
    # Replace `scholar_id` with your Google Scholar ID
    author = scholarly.search_author_id(scholar_id)
    scholarly.fill(author, sections=["publications"])

    publications = []
    for pub in author["publications"]:
        scholarly.fill(pub)  # Fill in details for each publication
        publications.append({
            "title": pub["bib"]["title"],
            "year": pub["bib"].get("pub_year"),
            "journal": pub["bib"].get("journal"),
            "citations": pub.get("num_citations", 0),  # Fetch citations
            "link": pub.get("pub_url")
        })

    # Save to JSON file
    with open("publications.json", "w") as file:
        json.dump(publications, file, indent=4)

# Replace with your Google Scholar author ID
fetch_publications("Rli2mWsAAAAJ")
