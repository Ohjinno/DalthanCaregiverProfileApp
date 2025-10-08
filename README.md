
# CaregiverProfile - Professional Profile Builder

A comprehensive Progressive Web App (PWA) designed specifically for caregivers, nurses, nannies, freelancers, and contractors to create professional profiles and generate stunning PDF resumes.

## 🌟 Features

### Core Functionality
- **Multi-Profession Support**: Tailored for Caregivers, Nurses, Nannies, Freelancers, and Contractors
- **Step-by-Step Profile Builder**: Intuitive interface with profession-specific forms
- **Photo Upload & Processing**: Professional headshot upload with automatic resizing
- **Multiple PDF Templates**: 4 professionally designed templates with different styles
- **Real-time Preview**: See your profile as you build it
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)

### Professional Features
- **Profession-Specific Fields**: Customized forms for each profession type
- **Skills & Certifications**: Comprehensive tracking of qualifications
- **Reference Management**: Add and manage professional references
- **Portfolio Items**: Showcase your work and achievements
- **Multi-language Support**: List languages you speak
- **Availability Tracking**: Set your work preferences and schedule

### Technical Features
- **Progressive Web App (PWA)**: Install on any device, works offline
- **Authentication System**: Secure email/password login with NextAuth.js
- **Database Integration**: PostgreSQL with Prisma ORM
- **File Upload System**: Secure image handling with Sharp processing
- **PDF Generation**: Client-side PDF creation with jsPDF
- **Lead Capture**: Built-in system for capturing user inquiries

## 🚀 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form handling

### Backend
- **Next.js API Routes** - Serverless functions
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **bcryptjs** - Password hashing

### PWA & Performance
- **Service Worker** - Offline functionality
- **Web App Manifest** - App installation
- **Sharp** - Image processing
- **jsPDF** - PDF generation

## 📱 PWA Features

- **Offline Capability**: Access cached pages and data without internet
- **App Installation**: Install directly from browser to home screen
- **Push Notifications**: Stay updated with important information
- **Background Sync**: Sync data when connection is restored
- **Responsive Design**: Optimized for all screen sizes

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Yarn package manager

### Environment Setup
Create a `.env` file in the `/app` directory:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd app
   yarn install
   ```

2. **Setup Database**
   ```bash
   yarn prisma generate
   yarn prisma db push
   ```

3. **Seed Database (Optional)**
   ```bash
   yarn prisma db seed
   ```

4. **Start Development Server**
   ```bash
   yarn dev
   ```

5. **Access the Application**
   - Open http://localhost:3000 in your browser
   - Test account: `john@doe.com` / `johndoe123`

## 📁 Project Structure

```
caregiver_profile_app/
├── app/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── profile/           # Profile builder
│   │   ├── templates/         # PDF templates
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   ├── lib/                   # Utilities and configurations
│   ├── prisma/               # Database schema
│   ├── public/               # Static assets
│   └── scripts/              # Database scripts
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: #26A69A (Teal)
- **Secondary**: #E0E0E0 (Light Gray)
- **Background**: #FFFFFF (White)
- **Text**: #333333 (Dark Gray)

### Design Principles
- **Mobile-First**: Responsive design starting from 320px
- **Accessibility**: WCAG 2.1 compliant
- **Professional**: Clean, modern aesthetic
- **User-Friendly**: Intuitive navigation and clear CTAs

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Profiles
- `GET /api/profiles` - Get user profile
- `POST /api/profiles` - Create/Update profile
- `PUT /api/profiles/[id]` - Update specific profile
- `DELETE /api/profiles/[id]` - Delete profile

### File Management
- `POST /api/upload` - Upload profile photos
- `GET /api/files/[...filename]` - Serve uploaded files

### Lead Management
- `POST /api/leads` - Create lead
- `GET /api/leads` - Get leads (admin)

## 📊 Database Schema

### Key Models
- **User**: Authentication and basic info
- **Profile**: Professional profile data
- **Lead**: Lead capture for marketing
- **Account/Session**: NextAuth.js tables

### Profile Fields
- Basic info (name, email, phone, address)
- Professional data (experience, skills, certifications)
- References and portfolio items
- Availability and preferences

## 🎯 Profession-Specific Features

### Caregivers
- Specialty areas (Elderly Care, Alzheimer's, etc.)
- Certifications tracking
- Transportation availability
- Care experience details

### Nurses
- License number validation
- Nursing specialties
- Clinical experience
- Education credentials

### Nannies
- Age group preferences
- Activity skills
- Safety certifications
- Childcare philosophy

### Freelancers
- Service offerings
- Technical skills
- Project portfolio
- Hourly rate management

### Contractors
- License and insurance info
- Service area coverage
- Specialty services
- Safety certifications

## 🚀 Deployment

### Production Deployment
The app is designed for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Heroku**

### Environment Variables
Ensure all environment variables are set in your production environment:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## 🧪 Testing

### Test Account
- **Email**: `john@doe.com`
- **Password**: `johndoe123`
- **Profile**: Complete caregiver profile with sample data

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Profile creation for each profession
- [ ] Photo upload and processing
- [ ] PDF generation and download
- [ ] Responsive design on mobile/tablet
- [ ] PWA installation and offline functionality

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **Session Management**: Secure JWT tokens
- **File Upload Security**: Type validation and size limits
- **CSRF Protection**: Built-in Next.js protection
- **Environment Variables**: Secure configuration management

## 🎯 Future Enhancements

### Planned Features
- [ ] Social media integration
- [ ] Advanced PDF customization
- [ ] Email templates
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Premium templates
- [ ] Team collaboration features

### Technical Improvements
- [ ] Advanced caching strategies
- [ ] GraphQL API layer
- [ ] Automated testing suite
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] Error tracking

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, please contact:
- **Email**: support@caregiverprofile.app
- **GitHub Issues**: Create an issue in this repository

## 🙏 Acknowledgments

- Built with love for care professionals worldwide
- Special thanks to the Next.js and React communities
- Icons and images provided by professional design resources

---

**CaregiverProfile** - Empowering care professionals with the tools they need to succeed.
