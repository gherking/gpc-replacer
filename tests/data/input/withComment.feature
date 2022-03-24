# Start comment(s) of the Document ${keyword2}

# Before tags comment of the Feature ${keyword1}
@tag1 @tag2
# Tag comment of @tag3 Tag ${keyword2}
@tag3
# Preceding comment of the Feature ${keyword1}
Feature: Name

  This is a multiline
  Feature description

  # Description comment of the Feature ${keyword2}

  # Before tags comment of the Rule ${keyword1}
  @tag1 @tag2
  # Preceding comment of the Rule ${keyword2}
  Rule: Name

    This is a multiline
    Rule description

    # Description comment of the Rule ${keyword2}

    # Preceding comment of the Background ${keyword1}
    Background: Name

      This is a multiline
      Background description

      # Description comment of the Background ${keyword2}

      # Comment of the given step ${keyword1}
      Given step
      # Comment of the when step ${keyword2}
      When step
      # Comment of the then step ${keyword1}
      Then step

    # Before tags comment of the Scenario ${keyword2}
    @tag1 @tag2
    # Preceding comment of the Scenario ${keyword1}
    Scenario: Name

      This is a multiline
      Scenario description

      # Description comment of the Scenario ${keyword2}

      # Comment of the given step ${keyword1}
      Given step
        # Comment of the docstirng ${keyword2}
        """
        docstring
        other docstring
        """
      # Comment of the when step
      When step
        # Comment of the data table row ${keyword2}
        | data  | table |
        # Comment of the data table row ${keyword1}
        | value | value |
        # Comment of the data table row ${keyword2}
        | value | value |
      # Comment of the then step ${keyword1}
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

    # Before tags comment of the ScenarioOutline ${keyword2}
    @tag1 @tag2
    # Preceding comment of the ScenarioOutline ${keyword1}
    Scenario Outline: Name

      This is a multiline
      ScenarioOutline description

      # Description comment of the ScenarioOutline ${keyword2}

      Given step <v>
      When step <w>

      # Before tags comment of the Examples ${keyword1}
      @tag1 @tag2
      # Preceding comment of the Examples ${keyword2}
      Examples: Name
        # Comment of the examples table row ${keyword1}
        | v | w |
        # Comment of the examples table row ${keyword2}
        | 1 | 2 |
        # Comment of the examples table row ${keyword1}
        | 2 | 3 |

# End comment(s) of the Document ${keyword2}