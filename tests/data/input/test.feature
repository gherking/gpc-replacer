@tag1 @${keyword1}
Feature: Hello world ${keyword1}
  As a smth
  I want to do ${keyword2}
  So that I am smth

  Rule: Rule name with replaced ${keyword2}
    Rule Description and replaced ${keyword1}

    Background: Name ${keyword2}
      Description ${keyword1}

      Given test is a given ${keyword1}
      And this is a given step too
      When this is a when step
      And this is a when step too
      Then it should be a then step
      And it should be a then step too

    @tag2 @${keyword1}
    Scenario: ${keyword1} Name of scenario
      ${keyword2} Description of the scenario

      Given this is a given ${keyword1}
      And this is a given step too
      When this is a when step with data table
        | val1 |
        | val2 |
        | val3 |
      And this is a when step with data table too
        | col1 | col2 |
        | val1 | val2 |
        | val3 | val4 |
      And this is a when step with doc string
        """
        Hello world
        Hello World
        hello World
        hello world
        """
      Then it should be a then step
      And it should be a then step too

    Scenario: Name of scenario
      Description of the scenario

      Given this is a given step
      And this is a given step too
      When this is a when step with data table
      Then it should be a then step

    @${keyword2} @tag(3)
    Scenario Outline: Name of scenario outline ${keyword1}
      Scenario outline ${keyword2} description
      Given this is a ${keyword2} step
      And this is a given step too
      When this is a when step <key>
      And this is a when step too <key2>
      Then it should be a then step
      And it should be a then step too

      @${keyword1}
      Examples: Replace in table header
        | ${keyword1} | key2   |
        | value1      | value2 |
        | value3      | value4 |

      Examples: Replace in table row
        | key         |
        | ${keyword2} |