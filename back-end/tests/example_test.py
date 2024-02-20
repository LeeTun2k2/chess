import pytest
from example import sum_of

def test_sum_of():
    assert sum_of(1, 2) == 3
    assert sum_of(0, 0) == 0
    assert sum_of(-1, 1) == 0
    assert sum_of(10, -5) == 5

