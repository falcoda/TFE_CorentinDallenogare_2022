import unittest
import mode
from app import app

class TestStringMethods(unittest.TestCase):
    """
    Class to test the backend
    Use unittest to test the backend
    """
    def testColor(self):
        actual = mode.color('#ff1275')
        expected =(255, 18, 117)
        self.assertEqual(actual, expected)

    def testWheel(self):
        actual = mode.wheel(19)
        expected =(57, 198, 0)
        self.assertEqual(actual, expected)

    def testEffect(self):
        mode.rainbowWheel(1,1,1,1,0,False,False)
        mode.status = False
        actual = mode.rainbowWheel(1,1,1,1,0,False,False)
        expected =(False)
        self.assertEqual(actual, expected)
    
    def testOff(self):
        actual = mode.powerOff('#000000')
        expected =('#000000')
        self.assertEqual(actual, expected)

    def testSpeed(self):
        actual = mode.adaptSpeed(0.5,0.01)
        expected =0.005
        self.assertEqual(actual, expected)
    
    def testUpdatePixel(self):
        actual = mode.updatePixels(5)
        expected =True
        self.assertEqual(actual, expected)
    
    def testSetBrightness(self):
        actual = mode.setBrightness(50)
        expected =0.5
        self.assertEqual(actual, expected)
    
    def setUp(self):
        self.app = app.test_client()
    
    def testIndex(self):
        rv = self.app.get('/')
        assert rv.status == '200 OK'
        assert b'Web site for controlling the TriLeds solution' in rv.data

    

if __name__ == '__main__':
    unittest.main()