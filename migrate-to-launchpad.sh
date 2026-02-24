#!/bin/bash

# Migration Script: Update /casestudies references to /launchpad
# Run this from your project root: bash migrate-to-launchpad.sh

echo "🚀 Migrating Case Studies to Launchpad..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Find all files with /casestudies references (excluding node_modules, .history, and the launchpad folder itself)
echo "Finding files with /casestudies references..."
FILES=$(grep -rl "/casestudies" app --include="*.tsx" --include="*.ts" --exclude-dir=node_modules --exclude-dir=.history --exclude-dir=launchpad 2>/dev/null)

if [ -z "$FILES" ]; then
    echo -e "${GREEN}✓ No /casestudies references found! You're all set.${NC}"
    exit 0
fi

echo "Found references in the following files:"
echo "$FILES"
echo ""

# Ask for confirmation
read -p "Do you want to update all /casestudies references to /launchpad? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Migration cancelled."
    exit 0
fi

# Perform the replacement
echo ""
echo "Updating files..."
for file in $FILES; do
    # Skip the redirect files we already created
    if [[ "$file" == "app/casestudies/page.tsx" ]] || [[ "$file" == "app/casestudies/"*"/page.tsx" ]]; then
        echo -e "${YELLOW}⊘ Skipping redirect file: $file${NC}"
        continue
    fi

    # Replace /casestudies with /launchpad
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' 's|/casestudies|/launchpad|g' "$file"
    else
        # Linux
        sed -i 's|/casestudies|/launchpad|g' "$file"
    fi

    echo -e "${GREEN}✓ Updated: $file${NC}"
done

echo ""
echo -e "${GREEN}✅ Migration complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Review the changes: git diff"
echo "2. Test your site: npm run dev"
echo "3. Visit /launchpad and /casestudies (should redirect)"
echo "4. Commit changes: git add . && git commit -m 'Migrate to Launchpad'"
