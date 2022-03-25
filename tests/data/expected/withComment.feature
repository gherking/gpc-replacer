# Start comment(s) of the Document value2

# Before tags comment of the Feature value1
@tag1 @tag2
# Tag comment of @tag3 Tag value2
@tag3
# Preceding comment of the Feature value1
Feature: Name

  This is a multiline
  Feature description

  # Description comment of the Feature value2

  # Before tags comment of the Rule value1
  @tag1 @tag2
  # Preceding comment of the Rule value2
  Rule: Name

    This is a multiline
    Rule description

    # Description comment of the Rule value2

    # Preceding comment of the Background value1
    Background: Name

      This is a multiline
      Background description

      # Description comment of the Background value2

      # Comment of the given step value1
      Given step
      # Comment of the when step value2
      When step
      # Comment of the then step value1
      Then step

    # Before tags comment of the Scenario value2
    @tag1 @tag2
    # Preceding comment of the Scenario value1
    Scenario: Name

      This is a multiline
      Scenario description

      # Description comment of the Scenario value2

      # Comment of the given step value1
      Given step
        # Comment of the docstirng value2
        """
        docstring
        other docstring
        """
      # Comment of the when step
      When step
        # Comment of the data table row value2
        | data  | table |
        # Comment of the data table row value1
        | value | value |
        # Comment of the data table row value2
        | value | value |
      # Comment of the then step value1
      Then step
        """markdown
        title
        =====
        docstring with content type
        """
      And step
        ```markdown
        docstring with backtick and content type
        ```

    # Before tags comment of the ScenarioOutline value2
    @tag1 @tag2
    # Preceding comment of the ScenarioOutline value1
    Scenario Outline: Name

      This is a multiline
      ScenarioOutline description

      # Description comment of the ScenarioOutline value2

      Given step <v>
      When step <w>

      # Before tags comment of the Examples value1
      @tag1 @tag2
      # Preceding comment of the Examples value2
      Examples: Name
        # Comment of the examples table row value1
        | v | w |
        # Comment of the examples table row value2
        | 1 | 2 |
        # Comment of the examples table row value1
        | 2 | 3 |

# End comment(s) of the Document value2