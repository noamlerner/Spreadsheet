# Spreadsheet
In order to get a better understanding of JavaScript I am writing this spreadsheet.

Features:
Methods
start entry with '='
currently available commands:sum, multiply, isOperator
  example: =sum(1,2,3)
    this will produce 6

Basic arithmetic
put equation into "=()" ...will solve according to PEMDAS (anything in parenthesis first ->exponents->multiplcation/division->addtion/subtraction
  example: =(5+3*(6+2^2))
    will produce 35

Link other cells in methods and arithmatic
  format |row:column|
    linking cell (1,1) and (1,2) in sum method: =sum(|1:1|,|1:2|,2)
      will add 4 to whatever is in sum method
    the same thing in arithmatic: =(|1:1|+|1:2|+2)
