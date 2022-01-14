@tag1 @value1
Feature: Hello world value1
    As a smth
    I want to do value2
    So that I am smth

    Background: Name value2
        Description value1

        Given test is a given value1
        And this is a given step too
        When this is a when step
        And this is a when step too
        Then it should be a then step
        And it should be a then step too

    @tag2 @value1
    Scenario: value1 Name of scenario
        value2 Description of the scenario

        Given this is a given value1
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

    @value2 @tag(3)
    Scenario Outline: Name of scenario outline value1
        Scenario outline value2 description
        Given this is a value2 step
        And this is a given step too
        When this is a when step <key>
        And this is a when step too <key2>
        Then it should be a then step
        And it should be a then step too

        @value1
        Examples: Replace in table header
            | value1 | key2   |
            | value1 | value2 |
            | value3 | value4 |

        Examples: Replace in table row
            | key    |
            | value2 |