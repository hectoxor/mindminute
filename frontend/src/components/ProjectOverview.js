// src/components/ProjectOverview.js

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  useTheme, 
  useMediaQuery, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EcoIcon from '@mui/icons-material/Eco';
import ResearchIcon from '@mui/icons-material/Research';
import SignificanceIcon from '@mui/icons-material/Scale';
import SolutionsIcon from '@mui/icons-material/Solutions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProjectOverview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 }
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
        >
          About CropAI
        </Typography>

        {/* Problem Statement */}
        <Box sx={{ mt: 4 }}>
          <motion.div variants={sectionVariants}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              🛑 What Problem Are We Addressing?
            </Typography>
            <Typography variant="body1" paragraph>
              Inefficient crop rotation practices in agriculture lead to soil nutrient depletion, over-reliance on synthetic inputs, excessive waste, and environmental degradation.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EcoIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Soil Nutrient Depletion"
                  secondary="Continuous cultivation of the same crop depletes specific soil nutrients, reducing soil fertility and diminishing crop yields."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EcoIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Over-Reliance on Synthetic Inputs"
                  secondary="Dependence on chemical fertilizers and pesticides is costly and environmentally harmful."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EcoIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Excessive Agricultural Waste"
                  secondary="Inefficient crop rotation contributes to significant food loss before and after harvest."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EcoIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Environmental Degradation"
                  secondary="Misuse of resources leads to water contamination, soil erosion, and loss of biodiversity."
                />
              </ListItem>
            </List>
          </motion.div>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Research Conducted */}
        <Box>
          <motion.div variants={sectionVariants}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              🔍 Research Conducted
            </Typography>
            <Typography variant="body1" paragraph>
              We conducted an extensive literature review and analyzed case studies on sustainable agriculture, AI-driven crop management, and their impacts on soil health and waste reduction.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  📚 Key Sources
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <ResearchIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary='"Optimizing Crop Rotation for Enhanced Soil Health and Yield Stability"'
                      secondary="Findings: Diversified rotation increased soil organic matter by 18% and reduced yield variability by 12%."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ResearchIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary='"Reducing Synthetic Fertilizer Dependence Through Strategic Crop Rotation"'
                      secondary="Findings: Strategic rotations decreased fertilizer use by 20% and reduced nitrogen runoff by 10%."
                    />
                  </ListItem>
                  {/* Add more list items as needed */}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  🌐 Website
                </Typography>
                <Typography variant="body1">
                  <a href="http://www.fao.org" target="_blank" rel="noopener noreferrer">
                    Food and Agriculture Organization of the United Nations (FAO)
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </motion.div>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Significance of the Problem */}
        <Box>
          <motion.div variants={sectionVariants}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              🌟 Why Is This Problem Significant? Who Does It Affect?
            </Typography>
            <Typography variant="body1" paragraph>
              Unsustainable agricultural practices lead to soil degradation, reduced yields, and environmental harm, impacting farmers, consumers, ecosystems, and future generations.
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="farmers-content"
                id="farmers-header"
              >
                <Typography><strong>Farmers and Agricultural Producers</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Economic Impact"
                      secondary="Higher costs for fertilizers and pesticides reduce profit margins."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Productivity Challenges"
                      secondary="Declining soil health and yields hinder sustainable farming."
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="consumers-content"
                id="consumers-header"
              >
                <Typography><strong>Consumers</strong></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Food Security"
                      secondary="Lower yields and higher costs lead to pricier, less available nutritious food."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Health Risks"
                      secondary="Pesticide residues in food pose potential health concerns."
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Add more Accordions for other stakeholders */}
          </motion.div>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Existing Solutions and Their Shortcomings */}
        <Box>
          <motion.div variants={sectionVariants}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              💡 Existing Solutions and Their Shortcomings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SolutionsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Traditional Crop Rotation Guides"
                  secondary="Generic recommendations that don't account for specific soil conditions or climate variations."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SolutionsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Soil Testing Services"
                  secondary="Provide raw data without actionable guidance, making it challenging for farmers to implement changes."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SolutionsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Farm Management Software"
                  secondary="Focuses on logistics and financials but lacks features for sustainability and dynamic crop rotation planning."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SolutionsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="NLP-Based Agricultural Assistants"
                  secondary="Provide generic advice without utilizing specific farmer data for personalized recommendations."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SolutionsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Hiring a Professional"
                  secondary="Scarce in rural areas, time-consuming, and may not provide site-specific advice."
                />
              </ListItem>
            </List>
          </motion.div>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Solution */}
        <Box>
          <motion.div variants={sectionVariants}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              🚀 Our Solution
            </Typography>
            <Grid container spacing={4}>
              {/* Objective 1 */}
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: `1px solid ${theme.palette.primary.main}`, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Optimize Crop Rotation for Soil Health
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="AI-Driven Plans"
                        secondary="Personalized crop rotation schedules based on soil conditions and historical data."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Sustainable Practices"
                        secondary="Reduces reliance on synthetic fertilizers and pesticides."
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>

              {/* Objective 2 */}
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: `1px solid ${theme.palette.primary.main}`, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Reduce Agricultural Waste
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Optimized Schedules"
                        secondary="Align crop rotations with market demand to prevent overproduction."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Resource Efficiency"
                        secondary="Minimizes spoilage and enhances profitability."
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>

              {/* Objective 3 */}
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, border: `1px solid ${theme.palette.primary.main}`, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Enhance Accessibility via NLP Interface
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="User-Friendly Platform"
                        secondary="Intuitive interface for easy interaction."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Personalized Support"
                        secondary="Provides actionable advice without needing professional consultations."
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Box>

      </Container>
    </motion.div>
  );
};

export default ProjectOverview;
