Tournament Plan Improvements
Clearer Handicap Display:

Now shows "Handicap: 19.4 | Tilleggsslag: 16 (19.4 × 93 ÷ 113)"
Uses proper terminology "tilleggsslag" instead of "banehandicap"
Shows the actual calculation formula for transparency
Displays course information (Par, Slope, Course Rating) for each round

Enhanced Team Display:

Format: Lag 4: Dag (19.4/16) & Roar (25.9/21)
Clear separation between individual handicap and added strokes
Shows team handicap calculation (70% lowest + 30% highest)

Enhanced Scorecards
Comprehensive Hole Information:

Hull 1 with Par, Stroke Index (SI), and lengths
Shows both yards and meters: "345y / 306m"
Visual indicators for stroke holes (yellow background)
Complete course header with Par, Slope, and Course Rating

Comprehensive Admin Panel
1. New Tournament Year Management

Create new tournament seasons
Automatically copies course templates
Resets all scores for fresh start

2. Participant Management

Add new players with handicaps
Remove existing participants
Real-time handicap editing

3. CSV/Excel Import System

Upload course data from spreadsheets
Expected format: Hole,Par,StrokeIndex,YardsWhite,YardsYellow,Meters
Validates data and creates complete course profiles

4. Enhanced Course Management

Edit course rating, slope rating, and lengths
Full hole-by-hole editor with distance data
Delete courses with confirmation
Import course data from CSV files

5. Competition Management per Course

Set longest drive and closest to pin holes for each round
Flexible competition setup
Validates hole numbers (1-18)

6. Enhanced Course Details Editor

Visual hole-by-hole editing
Validates stroke indexes (must be unique 1-18)
Automatic par calculation
Length data for each hole in yards and meters

Technical Improvements
Data Structure:

Enhanced course objects now include:

yardsWhite, yardsYellow, meters arrays
courseRating for proper handicap calculations
Complete hole-by-hole data validation



CSV Import Format:
csvHole,Par,StrokeIndex,YardsWhite,YardsYellow,Meters
1,4,9,345,335,306
2,3,7,121,111,101
...
Handicap Calculations:

Proper course handicap: (Player Handicap × Slope Rating) ÷ 113
Clear display of calculation formula
Scramble handicap: (70% × Lowest) + (30% × Highest)

The app now provides a complete tournament management system with professional-level course data management, clear handicap calculations, and the ability to import data from spreadsheets. All existing functionality is preserved while adding these powerful new administrative tools.
