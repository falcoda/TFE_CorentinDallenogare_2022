import unittest
import modes
from app import app

class TestStringMethods(unittest.TestCase):
    """
    Class to test the backend
    Use unittest to test the backend
    """
    def testColor(self):
        actual = modes.color('#ff1275')
        expected =(255, 18, 117)
        self.assertEqual(actual, expected)

    def testWheel(self):
        actual = modes.wheel(19)
        expected =(57, 198, 0)
        self.assertEqual(actual, expected)

    def testEffect(self):
        modes.rainbowWheel(1,1,1,1,0,False,False)
        modes.status = False
        actual = modes.rainbowWheel(1,1,1,1,0,False,False)
        expected =(False)
        self.assertEqual(actual, expected)
    
    def testOff(self):
        actual = modes.powerOff('#000000')
        expected =('#000000')
        self.assertEqual(actual, expected)

    def testSpeed(self):
        actual = modes.adaptSpeed(0.5,0.01)
        expected =0.005
        self.assertEqual(actual, expected)
    
   
    def setUp(self):
        self.app = app.test_client()
    
    def testIndex(self):
        rv = self.app.get('/')
        assert rv.status == '200 OK'
        assert b'Web site for controlling the TriLeds solution' in rv.data

    

if __name__ == '__main__':
    unittest.main()