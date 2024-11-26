Team Gold - Fall 2024

# Members

  - reginaldpinder - Reggie Pinder - rpind002@odu.edu
  - LazyHarpSeal - Gabby Ramirez - grami002@odu.edu
  - schen012 - Steven Chen - schen012@odu.edu
  - eshan03 - Erin Shanks - eshan003@odu.edu
  - MarketBoy01 - Angel Mercado - amerc006@odu.edu
  - lkeat003 - Lauren Keating - lkeat003@odu.edu
  - Baeduh - Kyle Munoz - kmuno003@odu.edu
  - gtcatlett - Glenn Catlett - gcatl002@odu.edu

# Backend

Docker Compose: docker-compose up --build
Docker Remove: docker-compose down 
Admin: http://localhost:8000/admin/
username: knowtimeAdmin
email: admin@odu.edu
password: TestMe123

# Run Tests
- Front End 
``` docker-compose run --rm jest ```

- Back End
``` docker compose run --rm jest```
``` python manage.py test tests.test_login ```

# Misc

To generate pydocs, assuming pydocs is installed

- Generate Files by CD to backend directory and running 
``` find . -path "./venv" -prune -o -name "*.py" -not -path "*/migrations/*" -exec python -m pydoc -w {} \; ```

- Move generated HTML files to pydocs directory
  ```  mv *.html pydocs/ ```

